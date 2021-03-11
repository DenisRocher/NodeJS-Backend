'use strict';

var express = require('express');
var ProjectController = require('../controllers/project');
var router = express.Router();

router.get('/home', ProjectController.home);
router.post('/test', ProjectController.test);
router.post('/save-project', ProjectController.saveProject);
router.post('/get-project/:id?', ProjectController.getProject);
router.post('/get-projectslist/:languages?', ProjectController.getProjects);
router.post('/update-project/:id?', ProjectController.updateProject);
router.post('/delete-project/:id?', ProjectController.deleteProject);

module.exports = router;




