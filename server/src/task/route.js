const express = require("express");
const app = express();
const router = express.Router();

const {
  createTask,
  getAllTasksByProjectId,
  updateTaskStatus,
} = require("./controller");
const { authenticateToken } = require("../utils/auth");

app.use("/", router);

router.post("/addTask", authenticateToken, createTask);
router.get("/getAll", authenticateToken, getAllTasksByProjectId);
router.patch("/status", authenticateToken, updateTaskStatus);

module.exports = router;
