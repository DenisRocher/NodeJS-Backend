'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = Schema({
  name: String,
  description: String,
  category: String,
  year: Number,
  languages: String,
  image: String
});

module.exports = mongoose.model('Project', ProjectSchema);
/** 
 * Automaticamente, mongodb Va a crear una coleccion en BBDD projects (si no 
 * existe: Minuscula + plural)
 */

