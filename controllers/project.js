'use strict';

const { restart } = require( 'nodemon' );
var Project = require('../models/project');

/** METODO 1 QUE DEVUELVE UN OBJETO JSON CON VARIOS METODOS */
var controller = {
  home: function(req, res){
    return res.status(200).send({
      message: 'Soy la Home'
    });
  },
  test: function(req, res){
    return res.status(200).send({
      message: 'Soy el método de test del controlador de project'
    });
  },
  saveProject: function(req, res){
    var project = new Project();
    var params = req.body;
    project.name = params.name;
    project.description = params.description;
    project.category = params.category;
    project.year = parseFloat(params.year);
    project.languages = params.languages;
    project.image = null;

    project.save((err, projectStored) => {
      if(err) return res.status(500).send({
        message: 'Error al guardar el project', project: project
      });
      if(!projectStored) return res.status(404).send({
        message: 'No se ha podido realizar la solicitud'
      });
      return res.status(200).send({project: projectStored});
    });
  },
  getProject: function(req, res){
    var projectId = req.params.id;

    if(projectId == null){
      return res.status(404).send({
        message: 'Error al invocar el servicio - No se informó ID proyecto'
      })
    };

    Project.findById(projectId, (err, project) => {
      if(err) return res.status(500).send({
        message: 'Error al recuperar el project: ' + projectId
      });
      if(!project) return res.status(404).send({
        message: 'El proyecto con id ' + projectId + ' no existe'
      });
      return res.status(200).send({project: project});      
    });
  },
  getProjects: function(req, res){
    var projectLanguages = req.params.languages;

    if(projectLanguages == null) {
      Project.find()
            .sort('year')
            .exec((err, projects)=> {
        if(err) return res.status(500).send({
          message: 'Error al recuperar el listado de proyectos'
        });
        if(!projects) return res.status(404).send({
          message: 'No existen proyectos'
        });
        return res.status(200).send({projects: projects});
      });
    }
    else {
        Project.find({'languages': {$regex: '.*' + projectLanguages +'.*'}})
              .sort('year')
              .exec((err, projects)=> {
        if(err) return res.status(500).send({
          message: 'Error al recuperar el listado de proyectos'
        });
        if(projects.length == 0) return res.status(404).send({
          message: 'No existen proyectos con languages: '+projectLanguages
        });
        return res.status(200).send({projects: projects});
      });
    }

  },
  updateProject: function(req, res){
    var projectId = req.params.id;
    var update = req.body;

    Project.findByIdAndUpdate(projectId, update, {new: true},(err, projectUpdate) => {
      if(err) return res.status(500).send({
        message: 'Error al invocar el servicio de update del project'
      });
      if(!projectUpdate) return res.status(404).send({
        message: 'No se ha podido realizar la actualización del project: '+projectId
      });
      return res.status(200).send({project: projectUpdate});      
    });
  },
    deleteProject: function(req, res){
    var projectId = req.params.id;

    Project.findByIdAndDelete(projectId, (err, projectDelete) => {
      if(err) return res.status(500).send({
        message: 'Error al invocar el servicio de borrado del project'
      });
      if(!projectDelete) return res.status(404).send({
        message: 'No se ha podido realizar el borrado del projecto: '+projectId
      });
      return res.status(200).send({project: projectDelete});      
    });
  }
};

module.exports = controller;
