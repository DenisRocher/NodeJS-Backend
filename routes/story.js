'use strict';

var express = require('express');
var StoryController = require('../controllers/story');
var router = express.Router();
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({uploadDir: './uploads'});

router.post('/save-story', StoryController.saveStory);
router.get('/relato/:id?', StoryController.getStory);
router.get('/relatos/:languages?', StoryController.getStories);
router.put('/update-story/:id?', StoryController.updateStory);
router.delete('/delete-story/:id?', StoryController.deleteStory);
router.post('/upload-image/:id?', multipartMiddleware,StoryController.uploadImage);


module.exports = router;




