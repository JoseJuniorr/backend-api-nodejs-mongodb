const { Router } = require("express");
const router = Router();

const UserController = require("../controllers/UserController");

router.get("/", (req, res) => {
  res.send("list users");
});

router.post("/create-user", UserController.store);

module.exports = router;
