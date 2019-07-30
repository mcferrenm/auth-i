const router = require("express").Router();

const Users = require("./users-model");

router.get("/", async (req, res) => {
  try {
    const users = await Users.get();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving users" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await Users.get(req.params.id);
    if (user) {

      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "User not found"})
    }
  } catch (error) {
    res.status(500).json({ error: "Error retrieving user" });
  }
});

module.exports = router;
