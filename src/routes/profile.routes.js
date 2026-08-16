import { Router } from "express";
import {
  agregarProfiles,
  eliminarProfile,
  getAllProfiles,
  getPorIdProfile,
} from "../controllers/profile.controller.js";
export const profileRoutes = Router();

profileRoutes.get("/profiles", getAllProfiles);
profileRoutes.post("/profiles", agregarProfiles);
profileRoutes.get("/profiles/:id", getPorIdProfile);
profileRoutes.delete("/profiles/:id", eliminarProfile);
