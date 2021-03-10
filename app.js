'use strict';

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// Cargar archivos de Rutas

// Middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// CORS

// Rutas
app.get('/', (req, res) => {
  res.status(200).send(
    '<h1>Página de inicio</h1>'
  )
});

app.get('/test', (req, res) => {
  res.status(200).send({
    message: 'Hola Mundo desde mi API de nodeJS // GET'
  })
});

app.post('/test/:id', (req, res) => {
  console.log(req.body.first_name);
  console.log(req.body.last_name);
  console.log(req.params.id);
  res.status(200).send({
    message: 'Hola Mundo desde mi API de nodeJS // POST'
  })
});

// Export
module.exports = app;

