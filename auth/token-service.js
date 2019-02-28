const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET || "IamNotMyThoughts";

module.exports = {
  generateToken: function (user) {
    const payload = {
      subject: user.id,
      username: user.username,
      roles: user.roles
    };
  
    const options = {
      expiresIn: "1d"
    };
    return jwt.sign(payload, secret, options);
  }
}