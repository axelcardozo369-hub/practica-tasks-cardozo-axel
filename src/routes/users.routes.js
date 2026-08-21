import { Router } from "express";
import {
  agregarUsers,
  editarUsers,
  eliminarUsers,
  getPorIdUsers,
  getUsersTodos,
} from "../controllers/users.controllers.js";
import { verPorIdTask } from "../controllers/tasks.controllers.js";
import { crearUserValidation } from "../middlewares/validations/user.validation.js";
import { validate } from "../middlewares/validate.js";

export const routerUsers = Router();
routerUsers.post("/users", crearUserValidation, validate, agregarUsers);
routerUsers.get("/users", getUsersTodos);
routerUsers.put("/users/:id", editarUsers);
routerUsers.get("/users/:id", getPorIdUsers);
routerUsers.delete("/users/:id", eliminarUsers);
