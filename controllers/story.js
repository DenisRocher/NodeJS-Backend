'use strict';

const { restart } = require( 'nodemon' );
var Story = require('../models/story');

//FileSystema para poder acceder a los directorios y eliminar archivos
var fs = require('fs');   

/** METODO 1 QUE DEVUELVE UN OBJETO JSON CON VARIOS METODOS */
var controller = {
  home: function(req, res){
    return res.status(200).send({
      message: 'Soy la Home'
    });
  },
  test: function(req, res){
    return res.status(200).send({
      message: 'Soy el método de test del controlador de relato'
    });
  },
  saveStory: function(req, res){
    var story = new Story();
    var params = req.body;
    story.name = params.name;
    story.description = params.description;
    story.category = params.category;
    story.year = parseFloat(params.year);
    story.country = params.languages;
    story.image = null;

    story.save((err, storyStored) => {
      if(err) return res.status(500).send({
        message: 'Error al guardar el relato', story: story
      });
      if(!storyStored) return res.status(404).send({
        message: 'No se ha podido realizar la solicitud'
      });
      return res.status(200).send({story: storyStored});
    });
  },
  getStory: function(req, res){
    var storyId = req.params.id;

    if(storyId == null){
      return res.status(404).send({
        message: 'Error al invocar el servicio - No se informó ID story'
      })
    };

    Story.findById(storyId, (err, story) => {
      if(err) return res.status(500).send({
        message: 'Error al recuperar el relato: ' + storyId
      });
      if(!story) return res.status(404).send({
        message: 'El relato con id ' + storyId + ' no existe'
      });
      return res.status(200).send({story: story});      
    });
  },
  getStories: function(req, res){
    var storyCountry = req.params.country;

    if(storyCountry == null) {
      Story.find()
            .sort('year')
            .exec((err, stories)=> {
        if(err) return res.status(500).send({
          message: 'Error al recuperar el listado de relatos'
        });
        if(!stories) return res.status(404).send({
          message: 'No existen relatos'
        });
        return res.status(200).send({stories: stories});
      });
    }
    else {
        Story.find({'country': {$regex: '.*' + storyCountry +'.*'}})
              .sort('year')
              .exec((err, stories)=> {
        if(err) return res.status(500).send({
          message: 'Error al recuperar el listado de relatos'
        });
        if(stories.length == 0) return res.status(404).send({
          message: 'No existen relatos en este país: '+storyCountry
        });
        return res.status(200).send({stories: stories});
      });
    }

  },
  updateStory: function(req, res){
    var storyId = req.params.id;
    var update = req.body;

    Story.findByIdAndUpdate(storyId, update, {new: true},(err, storyUpdate) => {
      if(err) return res.status(500).send({
        message: 'Error al invocar el servicio de actualización del relatos'
      });
      if(!storyUpdate) return res.status(404).send({
        message: 'No se ha podido realizar la actualización del relato: '+storyId
      });
      return res.status(200).send({story: storyUpdate});      
    });
  },
    deleteStory: function(req, res){
      var storyId = req.params.id;

      Story.findByIdAndDelete(storyId, (err, storyDelete) => {
        if(err) return res.status(500).send({
          message: 'Error al invocar el servicio de borrado de relato'
        });
        if(!storyDelete) return res.status(404).send({
          message: 'No se ha podido realizar el borrado del relato: '+storyId
        });
        return res.status(200).send({story: storyDelete});      
      });
  },
  uploadImage: function(req, res){
    var storyId = req.params.id;
    var fileName = 'Sin imagen';

    if(req.files){
      var filePath = req.files.image.path;
      var fileSplit = filePath.split('/');
      var fileName = fileSplit[1];
      var extSplit = fileName.split('.');
      var extFile = extSplit[1];

      if(extFile == 'png' || extFile == 'jpg' || extFile == 'jpeg' || extFile == 'gif'){
        Story.findByIdAndUpdate(storyId, {image: fileName},{new: true},(err, storyUpdate) =>{
          if(err) return res.status(500).send({
            message: 'Error al invocar el servicio de upload-image'
          });
          if(!storyUpdate) return res.status(404).send({
            message: 'No se ha podido subir la imagen del relato: '+storyId
          });
          return res.status(200).send({story: storyUpdate, files: fileName});
        });
      }
      else {
        fs.unlink(filePath, (err) =>{
        return res.status(404).send({
          message: 'Error de extension del archivo de image upload-image'
          });        
        });
      }
    }
    else{
      return res.status(404).send({
        message: fileName
      })
    }
  }
};

module.exports = controller;
