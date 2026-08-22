import { body, param } from "express-validator";
import { UserModel } from "../../models/users.model.js";

export const crearUserValidation = [
  body("name").notEmpty().withMessage("El nombre no debe estar vacio"),
  body("email")
    .notEmpty()
    .withMessage("el emai no debe ser vacio")
    .bail()
    .isEmail()
    .withMessage("el email debe ser si o si valido")
    .bail()
    .custom(async (email) => {
      const emailExistente = await UserModel.findOne({ where: { email } });
      if (emailExistente) {
        throw new Error(
          "este correo ya se encuentra registrado por otro usuario, ingresa otra",
        );
      }
      return true;
    }),
  body("password")
    .notEmpty()
    .withMessage("la contraseña no debe ser vacia")
    .isLength({ min: 10 })
    .withMessage("la constraseña puede tener al menos 10 caracteres"),
];
export const userPoridValidation = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("solo se permite numeros enteros, por ejemplo 1,2,3,4")
    .bail()
    .custom(async (id) => {
      const usuarioExiste = await UserModel.findByPk(id);
      if (!usuarioExiste) {
        throw new Error(
          "El usuario que ingresaste no esta en la base de datos ",
        );
      }
      return true;
    }),
];
export const eliminarUserValidation = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("el numero debe ser positivo")
    .bail()
    .custom(async (id) => {
      const userExiste = await UserModel.findByPk(id);
      if (!userExiste) {
        throw new Error("el usuario no se encuentra en la base de datos");
      }
      return true;
    }),
];
export const editarUserValidator = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("el numero debe ser positivo")
    .bail()
    .custom(async (id) => {
      const userExiste = await UserModel.findByPk(id);
      if (!userExiste) {
        throw new Error("El usuario no existe en la base de datos ");
      }
      return true;
    }),
  body("name")
    .notEmpty()
    .withMessage("el nombre del usuario no puede quedar vacio"),
  body("email")
    .notEmpty()
    .withMessage("El email no puede ser vacio")
    .bail()
    .isEmail()
    .withMessage("el email debe ser valido"),
  body("password")
    .notEmpty()
    .withMessage("el passowrd no puede ser vacio")
    .isLength({ min: 10 })
    .withMessage("la contraseña debe ser al menos 10 digitos"),
];
