import { matchedData } from "express-validator";
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
    const validationData = matchedData(req);
    const profile = await ProfileModel.create(validationData);
    return res.status(201).json({ mensaje: "perfil creado con exito" });
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
