import { Router } from "express";
import { agregarTask, editarTask, getTasks } from "../controllers/tasks.controllers.js";

export const routerTask = Router();

routerTask.get('/task',getTasks);
routerTask.post('/task',agregarTask);
routerTask.put('/task/:id',editarTask);

