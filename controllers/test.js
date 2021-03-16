'use strict';

const { restart } = require( 'nodemon' );
var Test = require('../models/test');

/** METODO 1 QUE DEVUELVE UN OBJETO JSON CON VARIOS METODOS */
var controller = {
  saveTest: function(req, res){
    var test = new Test();
    var params = req.body;
    test.name = params.name;
    test.description = params.description;
    test.category = params.category;
    test.year = parseFloat(params.year);
    test.languages = params.languages;
    test.image = null;

    test.save((err, testStored) => {
      if(err) return res.status(500).send({
        message: 'Error al guardar el test', test: test
      });
      if(!testStored) return res.status(404).send({
        message: 'No se ha podido realizar la solicitud'
      });
      return res.status(200).send({test: testStored});
    });
  },
  getTest: function(req, res){
    var testId = req.params.id;

    if(testId == null){
      return res.status(404).send({
        message: 'Error al invocar el servicio - No se informó ID proyecto'
      })
    };

    Test.findById(testId, (err, test) => {
      if(err) return res.status(500).send({
        message: 'Error al recuperar el test: ' + testId
      });
      if(!test) return res.status(404).send({
        message: 'El proyecto con id ' + testId + ' no existe'
      });
      return res.status(200).send({test: test});      
    });
  },
  getTests: function(req, res){
    var testLanguages = req.params.languages;

    if(testLanguages == null) {
      Test.find()
            .sort('year')
            .exec((err, tests)=> {
        if(err) return res.status(500).send({
          message: 'Error al recuperar el listado de proyectos'
        });
        if(!tests) return res.status(404).send({
          message: 'No existen proyectos'
        });
        return res.status(200).send({tests: tests});
      });
    }
    else {
        Test.find({'languages': {$regex: '.*' + testLanguages +'.*'}})
              .sort('year')
              .exec((err, tests)=> {
        if(err) return res.status(500).send({
          message: 'Error al recuperar el listado de proyectos'
        });
        if(tests.length == 0) return res.status(404).send({
          message: 'No existen proyectos con languages: '+testLanguages
        });
        return res.status(200).send({tests: tests});
      });
    }

  },
  updateTest: function(req, res){
    var testId = req.params.id;
    var update = req.body;

    Test.findByIdAndUpdate(testId, update, {new: true},(err, testUpdate) => {
      if(err) return res.status(500).send({
        message: 'Error al invocar el servicio de update del test'
      });
      if(!testUpdate) return res.status(404).send({
        message: 'No se ha podido realizar la actualización del test: '+testId
      });
      return res.status(200).send({test: testUpdate});      
    });
  },
    deleteTest: function(req, res){
    var testId = req.params.id;

    Test.findByIdAndDelete(testId, (err, testDelete) => {
      if(err) return res.status(500).send({
        message: 'Error al invocar el servicio de borrado del test'
      });
      if(!testDelete) return res.status(404).send({
        message: 'No se ha podido realizar el borrado del testo: '+testId
      });
      return res.status(200).send({test: testDelete});      
    });
  }
};

module.exports = controller;
