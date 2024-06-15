const { Task } = require("./model");
const { AppError } = require("../utils/errorHandler");
const { project } = require("../project/model");
const response = require("../utils/successResponse");
const {
  storeProjectsInCache,
  fetchProjectsFromCache,
} = require("../utils/redis");

let responseObject = {
  message: "",
  data: null,
};

const createTask = async (req, res, next) => {
  try {
    const userEmail = req.email;
    // const completeProjectData = await project.findById(req.body.projectId);
    const member = await project.findOne({
      _id: req.body.projectId,
      members: { $elemMatch: { email: userEmail } },
    });
    if (!member) {
      throw new AppError(403, "You are not authorized to add task here");
    }
    const taskData = await Task.create(req.body);
    const projectId= req.body.projectId
    taskById = await Task.find( {projectId});
    await storeProjectsInCache("taskById", taskById);

    const projectData = await project.findByIdAndUpdate(req.body.projectId, {
      $push: { tasks: taskData },
    });

    if (!projectData) {
      throw new AppError(404, "No Project Found With this ID");
    }
    responseObject={message:"task created succesfully", data:taskData}
   
    res.status(201).send(response(200, responseObject));
  } catch (error) {
    const customError = new AppError(error.statusCode || 500, error.message);
    next(customError);
  }
};

const getAllTasksByProjectId = async (req, res, next) => {
  try {
    const { projectId } = req.query;
    const tasks = taskById = await Task.find({ projectId });
    // const taskByProjectId = await Task.find({});
    // let taskById = await fetchProjectsFromCache("taskById");

    // if (!taskById) {
    //   taskById = await Task.find({ projectId });
    //   await storeProjectsInCache("taskById", taskById);
    // }

    responseObject = {
      message: "Projects fetched successfully",
      data: tasks,
    };
   
    res.status(201).send(response(200, responseObject));
  } catch (error) {
    const customError = new AppError(error.statusCode || 500, error.message);
    next(customError);
  }
};

const updateTaskStatus = async (req, res, next) => {
  try {
    const userEmail = req.email;
    const task = await Task.findById(req.query.taskId);
    const member = await project.findOne({
      _id: task.projectId,
      members: { $elemMatch: { email: userEmail } },
    });
    if (!member) {
      throw new AppError(403, "You are not authorized to update task here");
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.query.taskId,
      req.body
    );

    const updatedTaskData = await Task.findById(req.query.taskId);

    const responseObject = {
      message: "Task updated successfully",
      data: updatedTaskData,
    };
    res.status(201).send(response(200, responseObject));
  } catch (error) {
    // console.log(error);
    const customError = new AppError(error.statusCode || 500, error.message);
    next(customError);
  }
};
module.exports = { createTask, getAllTasksByProjectId, updateTaskStatus };
