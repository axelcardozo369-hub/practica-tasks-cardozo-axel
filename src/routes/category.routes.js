import { Router } from "express";
import {
  agregarCategory,
  editarCategory,
  eliminarCategory,
  getCategoryTodos,
  getPorIdCategory,
} from "../controllers/category.controller.js";
import { validate } from "../middlewares/validate.js";
import {
  agregarCategoryValidator,
  editarCategoryValidator,
  eliminarCategoryValidator,
  verPorIdCategoryValidator,
} from "../middlewares/validations/category.validation.js";
export const categoryRouter = Router();
categoryRouter.post(
  "/category",
  agregarCategoryValidator,
  validate,
  agregarCategory,
);
categoryRouter.get("/category", getCategoryTodos);
categoryRouter.get(
  "/category/:id",
  verPorIdCategoryValidator,
  validate,
  getPorIdCategory,
);
categoryRouter.delete(
  "/category/:id",
  eliminarCategoryValidator,
  validate,
  eliminarCategory,
);
categoryRouter.put(
  "/category/:id",
  editarCategoryValidator,
  validate,
  editarCategory,
);
