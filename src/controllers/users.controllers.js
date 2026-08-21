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
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        mensaje: "No pueden estar vacios,por favor ingrese datos requeridos",
      });
    }
    const nuevoUser = await UserModel.create({
      name,
      email,
      password,
    });
    res.status(201).json({ mensaje: "Usuario agregado con exito", nuevoUser });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ mensaje: "Error al poder agregar usuarios" });
  }
};
export const editarUsers = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, email, password } = req.body;
    const usersAfectada = await UserModel.update(
      { name, email, password },
      { where: { id } },
    );
    if (usersAfectada > 0) {
      const userModificado = await UserModel.findByPk(id);
      return res.json({ mensaje: "el usuario fué modificado", userModificado });
    } else {
      return res.status(404).json({ mensaje: "el usuario no fué encontrado " });
    }
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
          attributes: ["user_id", "nombre", "descripcion"],
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
