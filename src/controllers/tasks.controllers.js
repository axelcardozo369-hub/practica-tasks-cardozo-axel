import { TaskModel } from "../models/tasks.model.js";

export const getTasks = async (req,res)=>{
    try {
        const tasks = await task.findAll();
        return res.status(200).json(tasks);
    } catch (error) {
        console.log(error);
        res.status(500).json({mensaje:'El servidor tuvo errores al conectar con tareas'})
        
    }
}
export const agregarTask = async (req,res) =>{
    try {
        const {title, description} = req.body;
        const creacionTask = await TaskModel.create({
            title,
            description,
        });
        res.status(201).json({mensaje:'tarea agregada',agregarTask})
    } catch (error) {
        console.log(error);
        res.status(500).json({mensaje:'Error al poder agregar en la base de datos '})
        
    }
}
export const editarTask = async (req,res) =>{

    try {
        const modificarTask = await TaskModel.update(req.body,{
            where:{id: req.params.id}
        });
        if (modificarTask) {
            const taskModificada  = await TaskModel.findByPk(req.params.id)
            res.json({mensaje:'Tarea modificada',taskModificada});
        }else{
            res.status(404).json({mensaje:'tarea no encontrada'})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({mensaje:'Error en poder modificar la tarea',error});
    }
}