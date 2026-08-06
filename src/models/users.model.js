import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
const user = sequelize.define('user',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    name:{
        type:DataTypes.STRING(100),
        allowNull: false,
    },
    email:{
        type:DataTypes.STRING(100),
        unique:false,
        allowNull:true,
    },
    password:{
        type:DataTypes.STRING(100),
        allowNull:false
    }
});
export default user;