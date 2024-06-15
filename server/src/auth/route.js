const express = require("express");
const app = express();
const router = express.Router();

const { createUser, loginUser } = require("./controller");

app.use("/", router);

router.post("/register", createUser);
router.post("/login", loginUser);

module.exports = router;
