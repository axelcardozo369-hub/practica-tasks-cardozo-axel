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
    return res.status(200).json(tasks);
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
    const { title, description, user_id, project_id } = req.body;

    if (user_id) {
      const usuarioExiste = await UserModel.findByPk(user_id);
      if (!usuarioExiste) {
        return res
          .status(404)
          .json({ mensaje: "El usuario no existe en la base de datos" });
      }
    }
    const usuarioExiste = await ProjectModel.findByPk(user_id);
    if (!user_id) {
      return res
        .status(404)
        .json({
          mensaje: "falta el usuario,crea el usuario para agregar tarea",
        });
    }
    const projectoExiste = await ProjectModel.findByPk(project_id);
    if (!project_id) {
      return res.status(404).json({
        mensaje:
          "falta el proyecto, primero debes crear tu proyecto para agregar tareas",
      });
    }
    const projectExistente = await ProjectModel.findByPk(project_id);
    if (!projectExistente) {
      return res
        .status(400)
        .json({ mensaje: "Error, debes crear el proyecto primero" });
    }

    const taskNueva = await TaskModel.create({
      title,
      description,
      user_id,
      project_id,
    });
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
    const id = req.params.id;
    const { title, description } = req.body;
    const taskAfectadas = await TaskModel.update(
      { title, description },
      { where: { id } },
    );
    if (taskAfectadas > 0) {
      const taskModificada = await TaskModel.findByPk(id);
      return res.json({ mensaje: "la tarea fué modificada", taskModificada });
    } else {
      return res.status(404).json({ mensaje: "la tarea no fue encontrada" });
    }
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
