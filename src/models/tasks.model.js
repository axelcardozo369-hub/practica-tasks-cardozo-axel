import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import user from "./users.model.js";
import { title } from "node:process";
const task = sequelize.define('task',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    title:{
        type:DataTypes.STRING(100),
        unique:false,
        allowNull:false,
    },
    description:{
        type:DataTypes.STRING(100),
        allowNull:true,
    },
    isComplete:{
        type:DataTypes.BOOLEAN,
        defaultValue:false,

    }
})
export default task;