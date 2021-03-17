'use strict';

var express = require('express');
var CategoryController = require('../controllers/category');
var router = express.Router();
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({uploadDir: './uploads'});

router.post('/save', CategoryController.saveCategory);
router.get('/get/:id?', CategoryController.getCategory);
router.get('/getCategories/:name?', CategoryController.getCategories);
router.put('/update/:id?', CategoryController.updateCategory);
router.delete('/delete/:id?', CategoryController.deleteCategory);


module.exports = router;




