import { Router } from "express";
import {
  agregarProfiles,
  eliminarProfile,
  getAllProfiles,
  getPorIdProfile,
} from "../controllers/profile.controller.js";
import { agregarProfileValidation } from "../middlewares/validations/profile.validation.js";
import { validate } from "../middlewares/validate.js";
export const profileRoutes = Router();

profileRoutes.get("/profiles", getAllProfiles);
profileRoutes.post(
  "/profiles",
  agregarProfileValidation,
  validate,
  agregarProfiles,
);
profileRoutes.get("/profiles/:id", getPorIdProfile);
profileRoutes.delete("/profiles/:id", eliminarProfile);
