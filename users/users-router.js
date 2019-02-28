const router = require("express").Router();

const Users = require("./users-model");

router.get("/", async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving users" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await Users.findBy({ id: req.params.id });
    if (user) {
      const roles = await Users.findRolesByUserId(req.params.id);

      user.roles = roles;
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json({ error: "Error retrieving user" });
  }
});

module.exports = router;
