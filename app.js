'use strict';

var express = require('express');

var app = express();

// Cargar archivos de Rutas
var project_routes = require('./routes/project')
var test_routes = require('./routes/test')
var story_routes = require('./routes/story')
var category_routes = require('./routes/category')

// Middlewares
app.use(express.urlencoded({extended:false}));
app.use(express.json());

// CORS
/** 
 * Configurar cabeceras y cors
 * 
 * Cuando hacemos peticiones AJAX con jQuery o Angular a un backend o un API
 * REST es normal que tengamos problemas con el acceso CORS en NodeJS y nos 
 * fallen las peticiones.
 * Para eso podemos crear un middleware como este:
 */

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); //En vez del * se pone url permitida
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Rutas
app.use('/api/project', project_routes);
app.use('/api/test', test_routes);
app.use('/api/story', story_routes);
app.use('/api/category', category_routes);
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

