import { Router } from "express";
import {
  agregarProfiles,
  editarProfile,
  eliminarProfile,
  getAllProfiles,
  getPorIdProfile,
} from "../controllers/profile.controller.js";
import {
  agregarProfileValidation,
  editarProfileValidation,
  eliminarProfileValidator,
  profilePorIdValidation,
} from "../middlewares/validations/profile.validation.js";
import { validate } from "../middlewares/validate.js";
export const profileRoutes = Router();

profileRoutes.get("/profiles", getAllProfiles);
profileRoutes.post(
  "/profiles",
  agregarProfileValidation,
  validate,
  agregarProfiles,
);
profileRoutes.get(
  "/profiles/:id",
  profilePorIdValidation,
  validate,
  getPorIdProfile,
);
profileRoutes.delete(
  "/profiles/:id",
  eliminarProfileValidator,
  validate,
  eliminarProfile,
);
profileRoutes.put(
  "/profiles/:id",
  editarProfileValidation,
  validate,
  editarProfile,
);
