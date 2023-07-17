const express = require('express');
const postRouter = require('./routes/posts.js');
const authRouter = require('./routes/auth.js');
const cookieParser = require('cookie-parser');
const multer = require('multer');

const app = express();
app.use(cookieParser());

const bodyParser = require('body-parser');
app.use(express.json());
app.use(bodyParser.json());
const port = process.env.PORT || 5000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'E:/ReactJS/IG-react/Client/public/upload');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });
app.post('/api/upload', upload.single('file'), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.get('/api/hello', (req, res) => {
  res.send('Hello');
});

app.use('/api/post', postRouter);
app.use('/api/auth', authRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));
