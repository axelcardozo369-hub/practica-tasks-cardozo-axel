import { body } from "express-validator";

export const crearUserValidation = [
  body("name").notEmpty().withMessage("El nombre no debe estar vacio"),
  body("email")
    .notEmpty()
    .withMessage("el emai no debe ser vacio")
    .isEmail()
    .withMessage("el email debe ser si o si valido"),
  body("password").notEmpty().withMessage("la contraseña no debe ser vacia"),
];
