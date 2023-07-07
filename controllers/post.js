const database = require('../db');

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
    ? 'SELECT * FROM posts WHERE cat=?'
    : 'SELECT * FROM posts';

  db.query(q, [req.query.cat], (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });
};

module.exports = { getAllPosts, getPosts };
