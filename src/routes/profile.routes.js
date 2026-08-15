import { Router } from "express";
import {
  agregarProfiles,
  getAllProfiles,
} from "../controllers/profile.controller.js";
export const profileRoutes = Router();

profileRoutes.get("/profiles", getAllProfiles);
profileRoutes.post("/profiles", agregarProfiles);
