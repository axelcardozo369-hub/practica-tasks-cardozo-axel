import { body, param } from "express-validator";
import { CategoryModel } from "../../models/category.model.js";

export const agregarCategoryValidator = [
  body("name")
    .notEmpty()
    .withMessage("el name no debe estar vacio")
    .bail()
    .custom(async (name) => {
      const categoryExiste = await CategoryModel.findOne({ where: { name } });
      if (categoryExiste) {
        throw new Error("esta categoria ya existe en la base de datos");
      }
      return true;
    }),
];
export const verPorIdCategoryValidator = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("el id debe ser un numero positivo")
    .bail()
    .custom(async (id) => {
      const categoryExiste = await CategoryModel.findByPk(id);
      if (!categoryExiste) {
        throw new Error("no se encontró la categoria que buscaste");
      }
    }),
];
export const eliminarCategoryValidator = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("el id deber ser un numero positivo")
    .bail()
    .custom(async (id) => {
      const categoryExiste = await CategoryModel.findByPk(id);
      if (!categoryExiste) {
        throw new Error("no se encontro la categoria para borrar");
      }
    }),
];
export const editarCategoryValidator = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("el id debe ser un numero positivo")
    .bail(),
  body("name")
    .notEmpty()
    .withMessage("el name no puede quedar vacio")
    .bail()
    .custom(async (id) => {
      const categoryExiste = await CategoryModel.findByPk(id);
      if (!categoryExiste) {
        throw new Error("este id no se encuentra en la base de datos");
      }
    }),
];
