const express = require("express");
const app = express();
const router = express.Router();

const { createProject, addMembers, getAllProjects } = require("./controller");
const { authenticateToken } = require("../utils/auth");

app.use("/", router);

router.post("/addProject", authenticateToken, createProject);
router.post("/addMember", authenticateToken, addMembers);
router.get("/getAll", authenticateToken, getAllProjects);

module.exports = router;
