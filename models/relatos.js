'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RelatoSchema = Schema({
  name: String,
  description: String,
  category: String,
  year: Number,
  country: String,
  image: String
});

module.exports = mongoose.model('Relato', RelatosSchema);
/** 
 * Automaticamente, mongodb Va a crear una coleccion en BBDD projects (si no 
 * existe: Minuscula + plural)
 */
