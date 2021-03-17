'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = Schema({
  name: String,
  value: Number
});

module.exports = mongoose.model('Category', CategorySchema);
/** 
 * Automaticamente, mongodb Va a crear una coleccion en BBDD projects (si no 
 * existe: Minuscula + plural)
 */

