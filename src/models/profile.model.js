import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

export const profileModel = sequelize.define("profile", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  biografia: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  telefono: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    references: {
      model: "Users",
      key: "id",
    },
  },
});
