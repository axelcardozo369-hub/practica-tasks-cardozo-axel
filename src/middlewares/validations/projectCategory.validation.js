import { body, param } from "express-validator";
import { projectCategoryModel } from "../../models/project.category.model.js";
import { ProjectModel } from "../../models/project.model.js";
import { CategoryModel } from "../../models/category.model.js";
export const agregarProjectCategoryValidation = [
  body("project_id")
    .notEmpty()
    .withMessage("error, el id del proyecto no puede quedar vacio")
    .bail()
    .custom(async (project_id) => {
      const projectExiste = await ProjectModel.findByPk(project_id);
      if (!projectExiste) {
        throw new Error(
          "el id del proyecto que ingresas no esta en la base de datos",
        );
      }
      return true;
    })
    .bail(),
  body("category_id")
    .notEmpty()
    .withMessage("error, el id de la categoria no puede ser vacio")
    .bail()
    .custom(async (category_id) => {
      const categoryExiste = await CategoryModel.findByPk(category_id);
      if (!categoryExiste) {
        throw new Error("el id de categoria no existe en la base de datos");
      }
      return true;
    }),
];
export const verPorIdprojectCategoryValidator = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("el id deber ser numero positivo")
    .bail()
    .custom(async (id) => {
      const projectExiste = await ProjectModel.findByPk(id);
      if (!projectExiste) {
        throw new Error("no esta registrado en la base de datos");
      }
      return true;
    }),
];
