'use strict';

var express = require('express');
var StoryController = require('../controllers/story');
var router = express.Router();
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({uploadDir: './uploads'});

router.post('/save', StoryController.saveStory);
router.get('/getStory/:id?', StoryController.getStory);
router.get('/getStories/:category?', StoryController.getStories);
router.put('/update/:id?', StoryController.updateStory);
router.delete('/delete/:id?', StoryController.deleteStory);
router.post('/upload-image/:id?', multipartMiddleware,StoryController.uploadImage);
router.get('/getimage/:image?', multipartMiddleware,StoryController.getImageFile);
router.delete('/delete-image/:image?', multipartMiddleware,StoryController.removeImageFile);

module.exports = router;




