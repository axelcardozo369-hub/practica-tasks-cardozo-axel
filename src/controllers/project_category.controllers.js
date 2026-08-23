import { matchedData } from "express-validator";
import { CategoryModel } from "../models/category.model.js";
import { ProfileModel } from "../models/profile.model.js";
import { ProjectModel } from "../models/project.model.js";
import { TaskModel } from "../models/tasks.model.js";
import { UserModel } from "../models/users.model.js";
export const agregarProjectCategory = async (req, res) => {
  try {
    const { project_id, category_id } = matchedData(req);
    const project = await ProjectModel.findByPk(project_id);
    const category = await CategoryModel.findByPk(category_id);
    await project.addCategory(category);
    return res.status(201).json({ mensaje: "categoria asignada al proyecto" });
  } catch (error) {
    return res
      .status(500)
      .json({ mensaje: "uuff,error", error: error.message });
  }
};
export const getTodayProjectCategory = async (req, res) => {
  try {
    const projects = await ProjectModel.findAll({
      include: [
        { model: CategoryModel, as: "categories", attributes: ["id", "name"] },
        {
          model: UserModel,
          as: "user",
          attributes: ["name", "email"],
          include: [
            {
              model: ProfileModel,
              as: "profile",
              attributes: ["biografia", "telefono"],
            },
            {
              model: TaskModel,
              as: "tasks",
              attributes: ["title", "description"],
            },
          ],
        },
      ],
    });
    return res
      .status(200)
      .json({ mensaje: "Estos son los proyectos", projects });
  } catch (error) {
    return res
      .status(500)
      .json({ mensaje: "uuufs, error ", error: error.message });
  }
};
export const getPorIdProjectCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const projectCategory = await ProjectModel.findAll({
      include: [
        { model: CategoryModel, as: "categories", attributes: ["id", "name"] },
        {
          model: UserModel,
          as: "user",
          attributes: ["name", "email"],
          include: [
            {
              model: ProfileModel,
              as: "profile",
              attributes: ["biografia", "telefono"],
            },
            {
              model: TaskModel,
              as: "tasks",
              attributes: ["title", "description"],
            },
          ],
        },
      ],
    });
    if (!projectCategory) {
      return res.status(404).json({ mensaje: "proyecto no encontrado" });
    }
    return res
      .status(201)
      .json({ mensaje: "projectCategory encontrado", projectCategory });
  } catch (error) {
    return res
      .status(500)
      .json({ mensaje: "Error al ver projectCategory", error: error.message });
  }
};
