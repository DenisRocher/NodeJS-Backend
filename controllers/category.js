'use strict';

const { restart } = require( 'nodemon' );
var Category = require('../models/category');

//FileSystema para poder acceder a los directorios y eliminar archivos
var fs = require('fs');   

/** METODO 1 QUE DEVUELVE UN OBJETO JSON CON VARIOS METODOS */
var controller = {
  home: function(req, res){
    return res.status(200).send({
      message: 'Soy la Home de categoria'
    });
  },
  test: function(req, res){
    return res.status(200).send({
      message: 'Soy el método de test del controlador de categoria'
    });
  },
  saveCategory: function(req, res){
    var category = new Category();
    var params = req.body;
    category.name = params.name;
    category.value = parseFloat(params.value);

    category.save((err, categoryStored) => {
      if(err) return res.status(500).send({
        message: 'Error al guardar la nueva categoria', category: category
      });
      if(!categoryStored) return res.status(404).send({
        message: 'No se ha podido realizar la solicitud'
      });
      return res.status(200).send({category: categoryStored});
    });
  },
  getCategory: function(req, res){
    var categoryId = req.params.id;

    if(categoryId == null){
      return res.status(404).send({
        message: 'Error al invocar el servicio - No se informó ID category'
      })
    };

    Category.findById(categoryId, (err, category) => {
      if(err) return res.status(500).send({
        message: 'Error al recuperar la categoria: ' + categoryId
      });
      if(!category) return res.status(404).send({
        message: 'La categoria con id ' + category + ' no existe'
      });
      return res.status(200).send({category: category});      
    });
  },
  getCategories: function(req, res){
    var categoryName = req.params.name;

    if(categoryName == null) {
      Category.find()
            .sort('value')
            .exec((err, categories)=> {
        if(err) return res.status(500).send({
          message: 'Error al recuperar el listado de categorias'
        });
        if(!categories) return res.status(404).send({
          message: 'No existen categorias'
        });
        return res.status(200).send({categories: categories});
      });
    }
    else {
        Category.find({'name': {$regex: '.*' + categoryName +'.*'}})
              .sort('value')
              .exec((err, categories)=> {
        if(err) return res.status(500).send({
          message: 'Error al recuperar el listado de categorias'
        });
        if(categories.length == 0) return res.status(404).send({
          message: 'No existen categorias con este nombre: '+categoryName
        });
        return res.status(200).send({categories: categories});
      });
    }

  },
  updateCategory: function(req, res){
    var categoryId = req.params.id;
    var update = req.body;

    Category.findByIdAndUpdate(
        categoryId, 
        update, 
        {new: true},
        (err, CategoryUpdate) => {
          if(err) return res.status(500).send({
            message: 'Error al invocar el servicio de actualización del categorias'
          });
          if(!CategoryUpdate) return res.status(404).send({
            message: 'No se ha podido realizar la actualización de la categoria: '+categoryId
          });
          return res.status(200).send({category: CategoryUpdate});      
    });
  },
  deleteCategory: function(req, res){
    var categoryId = req.params.id;

    Category.findByIdAndDelete(categoryId, (err, categoryDelete) => {
      if(err) return res.status(500).send({
        message: 'Error al invocar el servicio de borrado de categoria'
      });
      if(!categoryDelete) return res.status(404).send({
        message: 'No se ha podido realizar el borrado de la categoria: '+categoryId
      });
      return res.status(200).send({category: categoryDelete});      
    });
  }
};

module.exports = controller;
