// import express from 'express';
const express = require('express');
const { getPost, getPosts } = require('../controllers/post.js');

const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPost);

// export default router;
module.exports = router;
