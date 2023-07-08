const express = require('express');
const postRouter = require('./routes/posts.js');
const authRouter = require('./routes/auth.js');

const app = express();
const bodyParser = require('body-parser');
app.use(express.json());
app.use(bodyParser.json());
const port = process.env.PORT || 5000;

app.get('/api/hello', (req, res) => {
  res.send('Hello');
});

app.use('/api/post', postRouter);
app.use('/api/auth', authRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));
