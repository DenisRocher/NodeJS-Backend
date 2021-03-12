'use strict';

var express = require('express');
var TestController = require('../controllers/test');
var router = express.Router();

router.post('/save-test', TestController.saveTest);
router.post('/get-test/:id?', TestController.getTest);
router.post('/get-testslist/:languages?', TestController.getTests);
router.post('/update-test/:id?', TestController.updateTest);
router.post('/delete-test/:id?', TestController.deleteTest);

module.exports = router;




