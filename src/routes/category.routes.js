import { Router } from "express";
import {
  agregarCategory,
  eliminarCategory,
  getCategoryTodos,
} from "../controllers/category.controller.js";

export const categoryRouter = Router();
categoryRouter.post("/category", agregarCategory);
categoryRouter.get("/category", getCategoryTodos);
categoryRouter.delete("/category/:id", eliminarCategory);
