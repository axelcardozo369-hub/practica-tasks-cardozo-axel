import { Router } from "express";
import { agregarProjectCategory, getPorIdProjectCategory, getTodayProjectCategory } from "../controllers/project_category.controllers.js";

export const projecCategRouter = Router();

projecCategRouter.post('/projectCategory',agregarProjectCategory);
projecCategRouter.get('/projectCategory',getTodayProjectCategory);
projecCategRouter.get('/projectCategory/:id',getPorIdProjectCategory);