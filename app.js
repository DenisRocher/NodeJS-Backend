'use strict';

var express = require('express');

var app = express();

// Cargar archivos de Rutas
var project_routes = require('./routes/project')

// Middlewares
app.use(express.urlencoded({extended:false}));
app.use(express.json());

// CORS
app.use('/api', project_routes);

// Rutas

/*
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
*/



// Export
module.exports = app;

