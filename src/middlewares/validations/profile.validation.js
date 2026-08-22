import { body } from "express-validator";
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
