const database = require('../db');

const db = database.db;

db.connect((error) => {
  if (error) console.error('Error connecting to database:', error);
});

const register = (req, res) => {
  db.query('SELECT * FROM user', (error, results, fields) => {
    if (error) {
      console.error(error);
    } else {
      console.log(results);
      res.json(results);
    }
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
