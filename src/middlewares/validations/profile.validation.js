import { body, param } from "express-validator";
import { ProfileModel } from "../../models/profile.model.js";
import { UserModel } from "../../models/users.model.js";
export const agregarProfileValidation = [
  body("biografia").notEmpty().withMessage("la biografia no puede estar vacia"),
  body("telefono")
    .notEmpty()
    .withMessage("el telefono no puede estar vacio")
    .custom(async (telefono) => {
      const nroTelephoneYaExiste = await ProfileModel.findOne({
        where: { telefono },
      });
      if (nroTelephoneYaExiste) {
        throw new Error(
          "no podes darle el mismo numero de telefono a un usuario que ya tiene dueño",
        );
      }
      return true;
    }),
  body("user_id")
    .notEmpty()
    .withMessage(
      "el id del usuario debe ser obligatorio para relacionar el perfil con usuario",
    )
    .isInt({ min: 1 })
    .withMessage("el id del usuario debe ser un numero positivo")
    .bail()
    .custom(async (user_id) => {
      if (!user_id) return true;
      const userExiste = await UserModel.findByPk(user_id);
      if (!userExiste) {
        throw new Error(
          "no podes agregar un perfil si usuario que ingresaste no está en la base de datos",
        );
      }
      const profileYaExistente = await ProfileModel.findOne({
        where: { user_id },
      });
      if (profileYaExistente) {
        throw new Error("este usuario ya tiene perfil");
      }

      return true;
    }),
];
export const profilePorIdValidation = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("el id del perfil debe ser positivo")
    .bail()
    .custom(async (id) => {
      const profileExiste = await ProfileModel.findByPk(id);
      if (!profileExiste) {
        throw new Error("el perfil no esta en la base de datos");
      }
      return true;
    }),
];
export const editarProfileValidation = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("el id del perfil debe ser un numero positivo")
    .bail()
    .custom(async (id) => {
      const profileExiste = await ProfileModel.findByPk(id);
      if (!profileExiste) {
        throw new Error(
          "no se encontro el perfil asignado en la base de datos",
        );
      }
      return true;
    })
    .bail(),
  body("biografia")
    .optional()
    .notEmpty()
    .withMessage("la biografia no puede estar vacia")
    .bail(),
  body("telefono")
    .optional()
    .notEmpty()
    .withMessage("el telefono no puede estar vacio"),
];
export const eliminarProfileValidator = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("el id debe ser un numero positivo")
    .bail()
    .custom(async (id) => {
      const idProfileExiste = await ProfileModel.findByPk(id);
      if (!idProfileExiste) {
        throw new Error(
          "el perfil que ingresaste no esta en la base de datos ",
        );
      }
      return true;
    }),
];
