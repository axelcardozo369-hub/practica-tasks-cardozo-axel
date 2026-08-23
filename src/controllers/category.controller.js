import { matchedData, validationResult } from "express-validator";
import { CategoryModel } from "../models/category.model.js";
export const agregarCategory = async (req, res) => {
  try {
    const validateData = matchedData(req);
    const category = await CategoryModel.create(validateData);
    return res
      .status(201)
      .json({ mensaje: "categoria agregada con exito", category });
  } catch (error) {
    return res
      .status(500)
      .json({ mensaje: "Error al agregar categoria", error: error.message });
  }
};
export const getCategoryTodos = async (req, res) => {
  try {
    const category = await CategoryModel.findAll();
    return res
      .status(200)
      .json({ mensaje: "estos son todos las categorias", category });
  } catch (error) {
    return res.status(500).json({
      mensaje: "error al ver todo las categorias",
      error: error.message,
    });
  }
};
export const eliminarCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const borrarCategory = await CategoryModel.destroy({ where: { id } });
    if (borrarCategory) {
      res.status(201).json({ mensaje: "categoria borrada" });
    } else {
      return res
        .status(404)
        .json({ mensaje: "esta categoria no fué encontrada" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ mensaje: "Error al borrar categorias", error: error.message });
  }
};
export const getPorIdCategory = async (req, res) => {
  try {
    const categoryUser = await CategoryModel.findByPk(req.params.id);
    if (categoryUser) {
      res.json(categoryUser);
    } else {
      res.status(404).json({ mensaje: "la categoria no fue encontrada" });
    }
  } catch (error) {
    return res.status(500).json({
      mensaje: "error al poder ver esta categoria",
      error: error.message,
    });
  }
};
export const editarCategory = async (req, res) => {
  try {
    const { id, name } = matchedData(req);
    await CategoryModel.update({ name }, { where: { id } });
    const categoryModificado = await CategoryModel.findByPk(id);
    return res
      .status(200)
      .json({ mensaje: "categoria actualizada con exito", categoryModificado });
  } catch (error) {
    return res.status(500).json({
      mensaje: "error al poder actualizar esta categoria",
      error: error.message,
    });
  }
};
