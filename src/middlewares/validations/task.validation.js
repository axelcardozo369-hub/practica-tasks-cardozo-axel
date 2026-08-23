import { body, param } from "express-validator";
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
    .bail()
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
      return true;
    }),
];
export const TaskPorIdValidator = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("solo debe ser numero positivos")
    .bail()
    .custom(async (id) => {
      const taskExiste = await TaskModel.findByPk(id);
      if (!taskExiste) {
        throw new Error("la tarea que ingresaste no esta en la base de datos");
      }
      return true;
    }),
];
export const eliminarTaksValidation = [
  param("id")
    .isInt({ min: 1 })
    .withMessage(
      "no puedes ingresar numeros negativos, ni letras, ingresa un numero positivo",
    )
    .bail()
    .custom(async (id) => {
      const taskExiste = await TaskModel.findByPk(id);
      if (!taskExiste) {
        throw new Error("la tarea asignada no esta en la base de datos");
      }
      return true;
    }),
];
export const editarTaskValidation = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("debes ingresar numeros positivos")
    .bail()
    .custom(async (id) => {
      const taskExiste = await TaskModel.findByPk(id);
      if (!taskExiste) {
        throw new Error(
          "la tarea que quieres modificar no esta en la base de datos",
        );
      }
      return true;
    }),
  body("title").notEmpty().withMessage("el title no puede ser vacio"),
  body("description")
    .optional()
    .notEmpty()
    .withMessage(
      "se requiere que description no esté vacia, pero seria ya opcional",
    ),
  body("user_id")
    .notEmpty()
    .withMessage("el id del usuario no debe ser vacio, es obligatorio")
    .isInt({ min: 1 })
    .withMessage("el id tiene que ser un numero positivo, no negativo")
    .bail()
    .custom(async (user_id) => {
      const userIdExiste = await UserModel.findByPk(user_id);
      if (!userIdExiste) {
        throw new Error(
          "el usuario que ingresaste no está en la base de datos",
        );
      }
      return true;
    }),
  body("project_id")
    .notEmpty()
    .withMessage("el id del proyecto no puede quedar vacio")
    .bail()
    .isInt({ min: 1 })
    .withMessage("el id debe ser un numero positivo")
    .bail()
    .custom(async (project_id) => {
      const projectIdExiste = await ProjectModel.findByPk(project_id);
      if (!projectIdExiste) {
        throw new Error("el id del proyecto no esta en la base de datos");
      }
      return true;
    }),
];
