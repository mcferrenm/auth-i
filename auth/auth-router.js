const router = require("express").Router();
const bcrypt = require("bcryptjs");

const Users = require("../users/users-model");
const tokenService = require("./token-service");

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      res.status(400).json({ message: "Must provide username and password" });
    } else {
      const hash = bcrypt.hashSync(password, 12);
      req.body.password = hash;

      const [id] = await Users.add(req.body);

      const user = await Users.findBy({ id });

      if (user) {
        const token = tokenService.generateToken(user);
        res.status(200).json({
          message: `Welcome ${user.username}, here is your token.`,
          token
        });
      } else {
        res.status(401).json({ error: "Error registering user" });
      }
    }
  } catch (error) {
    res.status(500).json({ error: "Error registering user" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      res.status(400).json({ message: "Must provide username and password" });
    } else {
      const user = await Users.findBy({ username });
      if (user && bcrypt.compareSync(password, user.password)) {
        const roles = await Users.findRolesByUserId(user.id);
        user.roles = roles;

        const token = tokenService.generateToken(user);

        res.status(200).json({
          message: `Welcome ${user.username}, here is your token.`,
          token,
          username: user.username
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    }
  } catch (error) {
    res.status(500).json({ error: "Error logging in user" });
  }
});

module.exports = router;
