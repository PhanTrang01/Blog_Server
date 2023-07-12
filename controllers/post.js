const database = require('../db');
const jwt = require('jsonwebtoken');

const db = database.db;
db.connect();

const getAllPosts = (req, res) => {
  db.query('SELECT * FROM posts', (error, results, fields) => {
    if (error) {
      console.error(error);
    } else {
      res.json(results);
    }
  });
};

const getPosts = (req, res) => {
  const q = req.query.cat
    ? 'SELECT * FROM posts WHERE category = ? '
    : 'SELECT * FROM posts';

  db.query(q, [req.query.cat], (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).json(data);
  });
};

const getPost = (req, res) => {
  const q =
    'SELECT p.id, u.username, p.title, p.desc, p.img, u.img AS userImg, p.category, p.CreateAt FROM `user` AS u JOIN `posts` AS p ON u.id = p.userId WHERE p.id = ?';

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data[0]);
  });
};

const addPost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated!');

  jwt.verify(token, 'jwtkey', (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!');

    const q =
      'INSERT INTO posts(`title`, `desc`, `img`, `category`, `CreateAt`,`userid`) VALUES (?)';

    const values = [
      req.body.title,
      req.body.desc,
      req.body.img,
      req.body.cat,
      req.body.date,
      userInfo.id,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json('Post has been created.');
    });
  });
};

const deletePost = (req, res) => {
  const token = req.cookies.access_token;

  if (!token) return res.status(401).json('Not authenticated!');

  jwt.verify(token, 'jwtkey', (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!');

    const postId = req.params.id;
    const q = 'DELETE FROM posts WHERE `id` = ? AND `userid` = ?';

    db.query(q, [postId, userInfo.id], (err, data) => {
      if (err) return res.status(403).json('You can delete only your post!');

      return res.json('Post has been deleted!');
    });
  });
};

module.exports = { getPost, getPosts, addPost, deletePost };
