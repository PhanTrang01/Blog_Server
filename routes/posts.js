// import express from 'express';
const express = require('express');
const { getAllPosts, getPosts } = require('../controllers/post.js');

const router = express.Router();

router.get('/', getAllPosts);

// export default router;
module.exports = router;
