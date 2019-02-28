const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET || "IamNotMyThoughts";

module.exports = {
  restricted: function(req, res, next) {
    const token = req.headers.authorization;

    if (token) {
      jwt.verify(token, secret, (err, decodedToken) => {
        if (err) {
          // log error to db
          res.status(401).json({ error: "cant touch this" });
        } else {
          req.decodedJwt = decodedToken;
          next();
        }
      });
    } else {
      res.status(401).json({ message: "Not authorized" });
    }
  },

  checkRoles: function(role) {
    return function(req, res, next) {
      if (req.decodedJwt.roles[0].name === role) {
        next();
      } else {
        res.status(403).json({ error: "Forbidden!" });
      }
    };
  }
};
