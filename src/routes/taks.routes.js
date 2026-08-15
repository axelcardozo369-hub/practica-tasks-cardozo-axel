import { Router } from "express";
import {
  agregarTask,
  editarTask,
  eliminarTasks,
  getTasks,
  verPorIdTask,
} from "../controllers/tasks.controllers.js";

export const routerTask = Router();

routerTask.get("/tasks", getTasks);
routerTask.get("/tasks/:id", verPorIdTask);
routerTask.post("/tasks", agregarTask);
routerTask.put("/tasks/:id", editarTask);
routerTask.delete("/tasks/:id", eliminarTasks);
