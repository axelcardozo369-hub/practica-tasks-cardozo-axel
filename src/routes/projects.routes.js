import { Router } from "express";
import {
  agregarProject,
  editarProject,
  eliminarProject,
  getAllProjects,
  getPorIdProject,
} from "../controllers/projects.controllers.js";
import { validate } from "../middlewares/validate.js";
import {
  agregarProjectValidation,
  editarProjectValidation,
  eliminarProjectValidator,
  verPorIdProjectValidator,
} from "../middlewares/validations/project.validation.js";

export const projectRouter = Router();

projectRouter.post(
  "/projects",
  agregarProjectValidation,
  validate,
  agregarProject,
);
projectRouter.get("/projects", getAllProjects);
projectRouter.get(
  "/projects/:id",
  verPorIdProjectValidator,
  validate,
  getPorIdProject,
);
projectRouter.delete(
  "/projects/:id",
  eliminarProjectValidator,
  validate,
  eliminarProject,
);
projectRouter.put(
  "/projects/:id",
  editarProjectValidation,
  validate,
  editarProject,
);
