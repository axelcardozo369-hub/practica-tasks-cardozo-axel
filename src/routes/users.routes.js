import { Router } from "express";
import {
  agregarUsers,
  editarUsers,
  eliminarUsers,
  getPorIdUsers,
  getUsersTodos,
} from "../controllers/users.controllers.js";
import { verPorIdTask } from "../controllers/tasks.controllers.js";
import {
  crearUserValidation,
  editarUserValidator,
  eliminarUserValidation,
  userPoridValidation,
} from "../middlewares/validations/user.validation.js";
import { validate } from "../middlewares/validate.js";

export const routerUsers = Router();
routerUsers.post("/users", crearUserValidation, validate, agregarUsers);
routerUsers.get("/users", getUsersTodos);
routerUsers.put("/users/:id", editarUserValidator, validate, editarUsers);
routerUsers.get("/users/:id", userPoridValidation, validate, getPorIdUsers);
routerUsers.delete(
  "/users/:id",
  eliminarUserValidation,
  validate,
  eliminarUsers,
);
