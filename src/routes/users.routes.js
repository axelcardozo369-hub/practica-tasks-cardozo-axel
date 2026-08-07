import { Router } from "express";
import { agregarUsers, editarUsers, eliminarUsers, getPorIdUsers, getUsersTodos } from "../controllers/users.controllers.js";
import { verPorIdTask } from "../controllers/tasks.controllers.js";
export const routerUsers = Router();
routerUsers.get('/users',getUsersTodos);
routerUsers.post('/users',agregarUsers);
routerUsers.put('/users/:id',editarUsers);
routerUsers.get('/users/:id',getPorIdUsers);
routerUsers.delete('/users/:id',eliminarUsers);