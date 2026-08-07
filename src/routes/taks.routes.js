import { Router } from "express";
import { agregarTask, editarTask, eliminarTasks, getTasks, verPorIdTask } from "../controllers/tasks.controllers.js";

export const routerTask = Router();

routerTask.get('/task',getTasks);
routerTask.get('/task/:id',verPorIdTask);
routerTask.post('/task',agregarTask);
routerTask.put('/task/:id',editarTask);
routerTask.delete('/task/:id',eliminarTasks);

