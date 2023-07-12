// import express from 'express';
const express = require('express');
const {
  getPost,
  getPosts,
  addPost,
  deletePost,
} = require('../controllers/post.js');

const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', addPost);
router.delete('/:id', deletePost);

// export default router;
module.exports = router;
