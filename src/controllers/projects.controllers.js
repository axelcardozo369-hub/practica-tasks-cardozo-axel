import { matchedData, validationResult } from "express-validator";
import { CategoryModel } from "../models/category.model.js";
import { ProfileModel } from "../models/profile.model.js";
import { ProjectModel } from "../models/project.model.js";
import { TaskModel } from "../models/tasks.model.js";
import { UserModel } from "../models/users.model.js";
import { projectRouter } from "../routes/projects.routes.js";
export const agregarProject = async (req, res) => {
  try {
    const validationData = matchedData(req);
    const project = await ProjectModel.create(validationData);
    return res.status(201).json({ mensaje: "proyecto agregado con exito" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      mensaje: "Error al poder agregar en la base de datos ",
      error: error,
    });
  }
};
export const getAllProjects = async (req, res) => {
  try {
    const projects = await ProjectModel.findAll({
      include: [
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
          ],
        },
        {
          model: TaskModel,
          as: "tasks",
          attributes: ["title", "user_id"],
        },
        { model: CategoryModel, as: "categories", attributes: ["name"] },
      ],
    });
    return res
      .status(200)
      .json({ mensaje: "Estos son los proyectos", projects });
  } catch (error) {
    return res
      .status(500)
      .json({ mensaje: "error interno del servidor", error: error.message });
  }
};
export const getPorIdProject = async (req, res) => {
  try {
    const idProjects = await ProjectModel.findByPk(req.params.id);
    if (idProjects) {
      res.status(201).json({ mensaje: "Proyecto encontrado", idProjects });
    } else {
      return res
        .status(404)
        .json({ mensaje: "proyecto no encontrado en la base  de datos " });
    }
  } catch (error) {
    return res.status(500).json({
      mensaje: "error interno al poder ver cada proyecto",
      error: error.message,
    });
  }
};
export const eliminarProject = async (req, res) => {
  try {
    const { id } = req.params;

    await ProjectModel.destroy({
      where: {
        id,
      },
    });

    return res
      .status(200)
      .json({ message: "proyecto eliminado correctamente" });
  } catch (error) {
    return res
      .status(500)
      .json({ mensaje: "error al eliminar projectos", error: error.message });
  }
};

export const editarProject = async (req, res) => {
  try {
    const validationData = matchedData(req, { locations: ["body"] });
    const { id } = matchedData(req, { locations: ["params"] });
    const projectExiste = await ProjectModel.findByPk(id);
    if (!projectExiste) {
      return res.status(404).json({ message: "proyecto no encontrado" });
    }

    await projectExiste.update(validatedDataBody);

    return res.json({ mensaje: "el proyecto fué modificado", validationData });
  } catch (error) {
    return res.status(500).json({
      mensaje: "error al poder editar el project",
      error: error.message,
    });
  }
};
