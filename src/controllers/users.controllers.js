import { matchedData, validationResult } from "express-validator";
import { ProfileModel } from "../models/profile.model.js";
import { ProjectModel } from "../models/project.model.js";
import { TaskModel } from "../models/tasks.model.js";
import { UserModel } from "../models/users.model.js";
import { projectRouter } from "../routes/projects.routes.js";
export const getUsersTodos = async (req, res) => {
  try {
    const user = await UserModel.findAll({
      attributes: {
        exclude: ["user_id", "password"],
      },
      include: [
        {
          model: TaskModel,
          as: "tasks",
          attributes: ["title", "description"],
        },
        {
          model: ProfileModel,
          as: "profile",
          attributes: ["biografia", "telefono"],
        },
        {
          model: ProjectModel,
          as: "projects",
          attributes: ["user_id", "nombre", "description"],
        },
      ],
    });
    res.json({ mensaje: "Estos son los usuarios:", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const agregarUsers = async (req, res) => {
  try {
    const validationData = matchedData(req);
    const user = await UserModel.create(validationData);
    res.status(201).json({ mensaje: "Usuario agregado con exito", user });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ mensaje: "Error al poder agregar usuarios" });
  }
};
export const editarUsers = async (req, res) => {
  try {
    const validationData = matchedData(req, { locations: ["body"] });
    const { id } = matchedData(req, { locations: ["params"] });
    const userExist = await UserModel.findByPk(id);
    if (!userExist) {
      return res.status(404).json({ mensaje: "usuario no encontrado" });
    }
    await userExist.update(validationData);
    return res.status(201).json({ mensaje: "usuario editado", userExist });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      mensaje: "Error al poder modificar usuarios",
      error: error.message,
    });
  }
};
export const getPorIdUsers = async (req, res) => {
  try {
    const idUsers = await UserModel.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
      include: [
        { model: TaskModel, as: "tasks", attributes: ["title", "description"] },
        {
          model: ProfileModel,
          as: "profile",
          attributes: ["biografia", "telefono"],
        },
        {
          model: ProjectModel,
          as: "projects",
          attributes: ["user_id", "nombre", "description"],
        },
      ],
    });
    if (idUsers) {
      res
        .status(201)
        .json({ mensaje: "Aqui esta el usuario que buscaste", idUsers });
    } else {
      res.status(404).json({ mensaje: "El usuario no fue encontrado" });
    }
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al poder ver por id al usuario",
      error: error.message,
    });
  }
};
export const eliminarUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const borrarUsers = await UserModel.destroy({
      where: { id },
    });
    if (borrarUsers) {
      res
        .status(201)
        .json({ mensaje: "Este usuario fue borrado con exito", borrarUsers });
    } else {
      res.status(404).json({ mensaje: "Este usuario no fue encontrado" });
    }
  } catch (error) {
    res.status(500).json({
      mensaje: "Hubo error al eliminar usuarios",
      error: error.message,
    });
  }
};
