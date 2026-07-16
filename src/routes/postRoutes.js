const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

//pega o get/post e encaminha para a funcao desejada
router.get('/', postController.getAllPosts);
router.post('/', postController.createPost);


router.get('/search', postController.searchPosts);

router.get('/:id', postController.getPostById);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);

module.exports = router;