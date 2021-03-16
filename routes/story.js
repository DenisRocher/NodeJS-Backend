'use strict';

var express = require('express');
var StoryController = require('../controllers/story');
var router = express.Router();
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({uploadDir: './uploads'});

router.get('/home', StoryController.home);
router.post('/test', StoryController.test);
router.post('/save-story', StoryController.saveStory);
router.post('/get-story/:id?', StoryController.getStory);
router.post('/get-storieslist/:languages?', StoryController.getStories);
router.put('/update-story/:id?', StoryController.updateStory);
router.delete('/delete-story/:id?', StoryController.deleteStory);
router.post('/upload-image/:id?', multipartMiddleware,StoryController.uploadImage);


module.exports = router;




