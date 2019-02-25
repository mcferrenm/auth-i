const db = require('../data/knexConfig');

module.exports = {
  find: function() {
    return db('users')
  }
};