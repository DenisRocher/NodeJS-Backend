'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StorySchema = Schema({
  name: String,
  description: String,
  category: String,
  year: Number,
  country: String,
  image: String,
  fileext: String
});

module.exports = mongoose.model('Story', StorySchema);
/** 
 * Automaticamente, mongodb Va a crear una coleccion en BBDD projects (si no 
 * existe: Minuscula + plural)
 */

