const database = require('../db');
const bcrypt = require('bcrypt');

const db = database.db;

db.connect((error) => {
  if (error) {
    console.error('Error connecting to database:', error);
    res.status(500).json(error);
  }
});

const register = (req, res) => {
  const q = 'SELECT * FROM user WHERE username = ? OR email = ? ';

  db.query(q, [req.body.username, req.body.email], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    if (!req.body.username || !req.body.email)
      return res.status(409).json('Please fill all fields!');
    if (data.length) return res.status(409).json('User already exists!');

    //Hash the password and create a user
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(req.body.password, salt, function (err, hash) {
        // Store hash in your password DB.
        const q = 'INSERT INTO user(username,email,password) VALUES (?)';
        const values = [req.body.username, req.body.email, hash];

        db.query(q, [values], (err, data) => {
          if (err) return res.status(500).json(err);
          return res.status(200).json('User has been created.');
        });
      });
    });
  });
};

const login = (req, res) => {
  const q = 'SELECT * FROM user WHERE username = ? ';

  db.query(q, [req.body.username], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    if (!req.body.username || !req.body.password) {
      return res.status(409).json('Please fill all fields!');
    }
    if (!data || !data.length) {
      return res.status(409).json('User not found!');
    }

    //Check password
    bcrypt
      .compare(req.body.password, data[0].password)
      .then((result) => {
        if (result !== true) {
          return res.status(400).json('Wrong username or password!');
        }
        return res.status(200).json('Success!');
      })
      .catch((error) => {
        console.log(error); // Handle the error appropriately
        return res
          .status(500)
          .json('An error occurred during password comparison');
      });
  });
};

const logout = (req, res) => {
  res.json('this is logout from controller');
};

module.exports = {
  register,
  login,
  logout,
};
