import { profileModel } from "../models/profile.model.js";
import { UserModel } from "../models/users.model.js";
export const getAllProfiles = async (req, res) => {
  try {
    const profiles = await profileModel.findAll({
      attributes: ["id", "biografia", "telefono"],
      include: [{ model: UserModel, attributes: ["id", "name", "email"] }],
    });
    return res.status(200).json({ mensaje: "Lista de perfiles", profiles });
  } catch (error) {
    return res
      .status(500)
      .json({ mensaje: "Error interno del servidor", error });
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
    const perfilExistente = await profileModel.findOne({ where: { user_id } });
    if (perfilExistente) {
      return res.status(400).json({
        mensaje: "El usuario que ingresaste ya está registrado con otro perfil",
      });
    }
    const profileNuevo = await profileModel.create({
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
