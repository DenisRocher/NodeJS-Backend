'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TestSchema = Schema({
  name: String,
  description: String,
  category: String,
  year: Number,
  languages: String,
  image: String
});

module.exports = mongoose.model('Test', TestSchema);
/** 
 * Automaticamente, mongodb Va a crear una coleccion en BBDD projects (si no 
 * existe: Minuscula + plural)
 */

