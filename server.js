// import postRouter from './routes/posts.js';
// import express from 'express';
const express = require('express');
const postRouter = require('./routes/posts.js');
const authRouter = require('./routes/auth.js');

const app = express();
const port = process.env.PORT || 5000;

const test = {
  int: 2,
  string: 'stringsss',
};

app.get('/api/hello', (req, res) => {
  res.send('Hello');
});

app.use('/api/post', postRouter);
app.use('/api/auth', authRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));
