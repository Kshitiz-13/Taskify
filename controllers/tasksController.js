import Task from "../models/Task.js";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from "../errors/index.js";
import checkPermissions from "../utils/checkPermissions.js";

const createTask = async (req, res) => {
  const { task, status } = req.body;

  if (!task || !status) {
    throw new BadRequestError("Please provide all values");
  }
  req.body.createdBy = req.user.userId;
  const singletask = await Task.create(req.body);
  res.status(StatusCodes.CREATED).json({ singletask });
};
const getAllTasks = async (req, res) => {
  const { status, taskType, sort, search } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
  };
  // add stuff based on condition

  if (status && status !== "all") {
    queryObject.status = status;
  }
  if (taskType && taskType !== "all") {
    queryObject.taskType = taskType;
  }
  if (search) {
    queryObject.task = { $regex: search, $options: "i" };
  }
  // NO AWAIT

  let result = Task.find(queryObject);

  // chain sort conditions

  if (sort === "latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "oldest") {
    result = result.sort("createdAt");
  }
  if (sort === "a-z") {
    result = result.sort("position");
  }
  if (sort === "z-a") {
    result = result.sort("-position");
  }

  //

  // setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const tasks = await result;

  const totalTasks = await Task.countDocuments(queryObject);
  const numOfPagesTasks = Math.ceil(totalTasks / limit);

  res.status(StatusCodes.OK).json({ tasks, totalTasks, numOfPagesTasks });
};
const updateTask = async (req, res) => {
  const { id: taskId } = req.params;

  console.log(req.body);
  const { task, taskStatus, taskType } = req.body;

  if (!task || !taskStatus || !taskType) {
    throw new BadRequestError("Please provide all values");
  }
  const singletask = await Task.findOne({ _id: taskId });

  if (!singletask) {
    throw new NotFoundError(`No task with id :${taskId}`);
  }
  // check permissions

  checkPermissions(req.user, singletask.createdBy);

  const updatedTask = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({ updatedTask });
};
const deleteTask = async (req, res) => {
  const { id: taskId } = req.params;

  const task = await Task.findOne({ _id: taskId });

  if (!task) {
    throw new NotFoundError(`No task with id :${taskId}`);
  }

  checkPermissions(req.user, task.createdBy);

  await task.remove();

  res.status(StatusCodes.OK).json({ msg: "Success! task removed" });
};

export { createTask, deleteTask, getAllTasks, updateTask };
