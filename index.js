'use strict';

var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;

var Admin = mongoose.mongo.Admin;
var app = require('./app');
var port = 3700;

var dbName = 'portafolio';

var uri = "mongodb+srv://AdminMongodBCloud:AvdRO7hnBJBRbWx6@clustergooglecloud.toqnt.mongodb.net/"+dbName+"?retryWrites=true&w=majority";

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
