import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import { UserModel } from "./users.model.js";
export const ProjectModel = sequelize.define("project", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "users",
      key: "id",
    },
  },
});

UserModel.hasMany(ProjectModel, { foreignKey: "user_id", as: "projects" });
ProjectModel.belongsTo(UserModel, { foreignKey: "user_id", as: "user" });
