import { Router } from "express";
import {
  agregarProjectCategory,
  getPorIdProjectCategory,
  getTodayProjectCategory,
} from "../controllers/project_category.controllers.js";
import { validate } from "../middlewares/validate.js";
import {
  agregarProjectCategoryValidation,
  verPorIdprojectCategoryValidator,
} from "../middlewares/validations/projectCategory.validation.js";
import { verPorIdCategoryValidator } from "../middlewares/validations/category.validation.js";
export const projecCategRouter = Router();

projecCategRouter.post(
  "/projectCategory",
  agregarProjectCategoryValidation,
  validate,
  agregarProjectCategory,
);
projecCategRouter.get("/projectCategory", getTodayProjectCategory);
projecCategRouter.get(
  "/projectCategory/:id",
  verPorIdprojectCategoryValidator,
  validate,
  getPorIdProjectCategory,
);
