import { CategoryModel } from "../models/category.model.js";
import { ProfileModel } from "../models/profile.model.js";
import { ProjectModel } from "../models/project.model.js";
import { TaskModel } from "../models/tasks.model.js";
import { UserModel } from "../models/users.model.js";
import { projectRouter } from "../routes/projects.routes.js";

export const agregarProject = async (req, res) => {
  try {
    const { nombre, description, user_id } = req.body;
    if (user_id) {
      const usuarioExiste = await UserModel.findByPk(user_id);
      if (!usuarioExiste) {
        return res
          .status(404)
          .json({ mensaje: "El usuario no existe en la base de datos" });
      }
    }
    const nuevoProject = await ProjectModel.create({
      nombre,
      description,
      user_id,
    });
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
          attributes: ["title", "description", "user_id"],
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
