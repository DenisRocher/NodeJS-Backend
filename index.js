'use strict';

var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;

var Admin = mongoose.mongo.Admin;
var app = require('./app');
var config = require('./models/configuracion');

var dbName = config.Configuracion.dbName;
var password = config.Configuracion.password;
var userAdmin = config.Configuracion.userAdmin;
var port = config.Configuracion.port;

console.log(config);
console.log(userAdmin);

var uri = "mongodb+srv://"+userAdmin+":"+password+"@clustergooglecloud.toqnt.mongodb.net/"+dbName+"?retryWrites=true&w=majority";

mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology: true })
    .then((MongooseNode) => {
      //const nativeConnetion =  MongooseNode.connections[0];
      //new Admin(nativeConnetion.db).listDatabases(function(err, results){
      //    console.log(results)  //store results and use
      //  });
      // Creacion del servidor
      console.log('Conexión a BBDD exitosa');
      app.listen(port, () => {
        console.log('Servidor corriendo correctamente en la url localhost:3700');
      });
    })
    .catch(err => {
      console.error('App starting error:', err.stack);
      process.exit(1)
    });
