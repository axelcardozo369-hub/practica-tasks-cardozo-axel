import { Router } from "express";
import {
  agregarProject,
  getAllProjects,
  getPorIdProject,
} from "../controllers/projects.controllers.js";
export const projectRouter = Router();

projectRouter.post("/projects", agregarProject);
projectRouter.get("/projects", getAllProjects);
projectRouter.get("/projects/:id", getPorIdProject);
