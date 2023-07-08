const database = require('../db');

const db = database.db;

db.connect((error) => {
  if (error) {
    console.error('Error connecting to database:', error);
    res.status(500).json(error);
  }
});

const registerItem = {
  id: 1,
  username: 'trangg',
  email: 'trangg',
  password: '123456',
  img: 'https://png.pngtree.com/png-clipart/20190904/original/pngtree-user-cartoon-girl-avatar-png-image_4492903.jpg',
};

const register = (req, res) => {
  // db.query('SELECT * FROM user', (error, results, fields) => {
  //   if (error) {
  //     console.error(error);
  //   } else {
  //     console.log(results);
  //     res.json(results);
  //   }
  // });
  console.log(req.body);
  const q = 'SELECT * FROM user WHERE username = ? OR email = ? ';

  db.query(q, [req.body.username, req.body.email], (err, data) => {
    if (err) {
      console.log(res.status(500).json(err));
    }
    // return console.log(res.status(500).json(err));
    if (data.length) return res.status(409).json('User already exists!');

    const q = 'INSERT INTO user(username,email,password) VALUES (?)';
    const values = [req.body.username, req.body.email, req.body.password];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json('User has been created.');
    });
  });
};

const login = (req, res) => {
  res.json('this is login from controller');
};

const logout = (req, res) => {
  res.json('this is logout from controller');
};

module.exports = {
  register,
  login,
  logout,
};
