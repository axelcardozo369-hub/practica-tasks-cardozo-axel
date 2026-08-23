import { body, param } from "express-validator";
import { ProjectModel } from "../../models/project.model.js";
import { UserModel } from "../../models/users.model.js";

export const agregarProjectValidation = [
  body("nombre").notEmpty().withMessage("el nombre no debe ser vacio"),
  body("description")
    .notEmpty()
    .withMessage("la description no debe ser vacio"),
  body("user_id")
    .notEmpty()
    .withMessage("el user id no debe estar vacio")
    .bail()
    .isInt({ min: 1 })
    .withMessage(
      "no podes elegir un usuario por numero negativo, elije por numero positivo",
    )
    .bail()
    .custom(async (user_id) => {
      const userIdExiste = await UserModel.findByPk(user_id);
      if (!userIdExiste) {
        throw new Error("el usuario ingresado no esta en la base de datos");
      }
      return true;
    }),
];
export const verPorIdProjectValidator = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("debe ser un numero positivo")
    .bail()
    .custom(async (id) => {
      const idProjectExiste = await ProjectModel.findByPk(id);
      if (!idProjectExiste) {
        throw new Error("el proyecto que buscaste no esta en la base de datos");
      }
      return true;
    }),
];
export const eliminarProjectValidator = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("el id debe un numero positivo")
    .bail()
    .custom(async (id) => {
      const idProjectExiste = await ProjectModel.findByPk(id);
      if (!idProjectExiste) {
        throw new Error("el proyecto que buscaste no esta en la base de datos");
      }
      return true;
    }),
];
export const editarProjectValidation = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("el id deber ser numero positivo")
    .bail()
    .custom(async (id) => {
      const existeIdProject = await ProjectModel.findByPk(id);
      if (!existeIdProject) {
        throw new Error(
          "el proyecto no fue encontrado por que no está en la base de datos",
        );
      }
    })
    .bail(),
  body("nombre")
    .optional()
    .notEmpty()
    .withMessage("el nombre no puede ser vacio")
    .bail(),
  body("description")
    .optional()
    .notEmpty()
    .withMessage("description no debe ser vacio")
    .bail(),
  body("user_id")
    .notEmpty()
    .withMessage("el id del usuario no puede quedar vacio")
    .bail()
    .custom(async (user_id) => {
      const userIdExiste = await UserModel.findByPk(user_id);
      if (!userIdExiste) {
        throw new Error(
          "el usuario que ingresaste no esta en la base de datos",
        );
      }
    }),
];
