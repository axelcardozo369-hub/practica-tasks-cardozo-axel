import { Router } from "express";
import {
  agregarTask,
  editarTask,
  eliminarTasks,
  getTasks,
  verPorIdTask,
} from "../controllers/tasks.controllers.js";
import {
  agregaTaskValidation,
  editarTaskValidation,
  eliminarTaksValidation,
  TaskPorIdValidator,
} from "../middlewares/validations/task.validation.js";
import { validate } from "../middlewares/validate.js";

export const routerTask = Router();

routerTask.get("/tasks", getTasks);
routerTask.get("/tasks/:id", TaskPorIdValidator, validate, verPorIdTask);
routerTask.post("/tasks", agregaTaskValidation, validate, agregarTask);
routerTask.put("/tasks/:id", editarTaskValidation, validate, editarTask);
routerTask.delete(
  "/tasks/:id",
  eliminarTaksValidation,
  validate,
  eliminarTasks,
);
