import { body } from "express-validator";
import { TaskModel } from "../../models/tasks.model.js";
import { UserModel } from "../../models/users.model.js";
import { ProjectModel } from "../../models/project.model.js";

export const agregaTaskValidation = [
  body("title").notEmpty().withMessage("el titulo no debe ser vacio"),
  body("description")
    .notEmpty()
    .withMessage("la descripcion no debe ser vacia"),
  body("user_id")
    .notEmpty()
    .withMessage("el id del usuario no puede ser vacio")
    .custom(async (user_id) => {
      if (!user_id) return true;
      const userExiste = await UserModel.findByPk(user_id);
      if (!userExiste) {
        throw new Error(
          "No se encuentra en la base de datos el usuario ingresado",
        );
      }
      return true;
    })
    .isInt({ min: 1 })
    .withMessage("el usuario tiene que ser un numero positivo"),
  body("project_id")
    .notEmpty()
    .withMessage("El id del project no puede ser vacio")
    .isInt({ min: 1 })
    .withMessage("el id del proyecto debe ser un número positivo")
    .bail()
    .custom(async (project_id) => {
      if (!project_id) return true;
      const project = await ProjectModel.findByPk(project_id);
      if (!project) {
        throw new Error(
          "el proyecto que asignaste, no está en la base de datos",
        );
      }
    }),
];
