import { CategoryModel } from "../models/category.model.js";

export const agregarCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const nuevaCategory = await CategoryModel.create({
      name,
    });
    res.status(201).json({ mensaje: "categoria agregada con exito",nuevaCategory });
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
