import { ProfileModel } from "../models/profile.model.js";
import { TaskModel } from "../models/tasks.model.js";
import { UserModel } from "../models/users.model.js";
export const getAllProfiles = async (req, res) => {
  try {
    const profiles = await ProfileModel.findAll({
      attributes: ["id", "biografia", "telefono"],
      include: [
        { model: UserModel, as: "user", attributes: ["id", "name", "email"] },
      ],
    });
    return res.status(200).json({ mensaje: "Lista de perfiles", profiles });
  } catch (error) {
    return res
      .status(500)
      .json({ mensaje: "Error interno del servidor", error: error.message });
  }
};

export const agregarProfiles = async (req, res) => {
  try {
    const { biografia, telefono, user_id } = req.body;
    if (!biografia || !telefono || !user_id) {
      return res.status(400).json({ mensaje: "cada campo es obligatorio" });
    }
    if (user_id) {
      const usuarioExiste = await UserModel.findByPk(user_id);
      if (!usuarioExiste) {
        return res
          .status(404)
          .json({ mensaje: "el usuario no está en la base de datos" });
      }
    }

    const perfilExistente = await ProfileModel.findOne({ where: { user_id } });
    if (perfilExistente) {
      return res.status(400).json({
        mensaje: "El usuario que ingresaste ya está registrado con otro perfil",
      });
    }
    const profileNuevo = await ProfileModel.create({
      biografia,
      telefono,
      user_id,
    });
    return res.status(201).json({ mensaje: "perfil creado correctamente" });
  } catch (error) {
    return res
      .status(500)
      .json({ mensaje: "Error interno de la base de datos", error: error });
  }
};
export const getPorIdProfile = async (req, res) => {
  try {
    const idProfile = await ProfileModel.findByPk(req.params.id, {
      include: [
        { model: UserModel, as: "user", attributes: ["name", "email"] },
      ],
    });
    if (idProfile) {
      return res
        .status(200)
        .json({ mensaje: "aqui está el perfil que buscaste", idProfile });
    } else {
      return res.status(404).json({ mensaje: "El perfil no fue encontrado" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ mensaje: "uffs, falló al arrancar :(", error: error.message });
  }
};
export const eliminarProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const borrarProject = await ProfileModel.destroy({ where: { id } });
    if (borrarProject) {
      return res.json({ mensaje: "ser borro el perfil" });
    } else {
      return res.json({ mensaje: "No se encontro el perfil" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ mensaje: "Error al eliminar", error: error.message });
  }
};
