import { matchedData } from "express-validator";
import { ProjectModel } from "../models/project.model.js";
import { TaskModel } from "../models/tasks.model.js";
import { UserModel } from "../models/users.model.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.findAll({
      include: [
        {
          model: UserModel,
          as: "user",
          attributes: ["name", "email"],
        },
      ],
    });
    return res
      .status(200)
      .json({ mensaje: "estas son todas las tareas", tasks });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ mensaje: "El servidor tuvo errores al conectar con tareas" });
  }
};
export const verPorIdTask = async (req, res) => {
  try {
    const taskId = await TaskModel.findByPk(req.params.id, {
      include: [
        { model: UserModel, as: "user", attributes: ["name", "email"] },
      ],
    });
    if (taskId) {
      res.json(taskId);
    } else {
      res.status(404).json({ mensaje: "la tarea no fue encontrada" });
    }
  } catch (error) {
    res.status(500).json({ mensaje: "Hay error", error: error.message });
  }
};
export const agregarTask = async (req, res) => {
  try {
    const validationData = matchedData(req);
    const task = await TaskModel.create(validationData);
    return res.status(201).json({ mensaje: "tarea agregada con exito" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      mensaje: "Error al poder agregar en la base de datos ",
      error: error.message,
    });
  }
};
export const editarTask = async (req, res) => {
  try {
    const validationDataBody = matchedData(req, { locations: ["body"] });
    console.log(validationDataBody);
    return res.status(201).json({ mensaje: "la tarea fue modificada" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      mensaje: "Error al poder modificar tareas",
      error: error.message,
    });
  }
};
export const eliminarTasks = async (req, res) => {
  try {
    const { id } = req.params;
    const borraTasks = await TaskModel.destroy({ where: { id } });
    if (borraTasks) res.json({ mensaje: "se borro esta tarea" });
    else res.status(404).json({ mensaje: "No se encontro esta tarea" });
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "error al poder eliminar tarea", error: error.message });
  }
};
