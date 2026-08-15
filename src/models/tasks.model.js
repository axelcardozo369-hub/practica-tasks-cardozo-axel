import { BelongsTo, DataTypes } from "sequelize";
import sequelize from "../config/database.js";

import { title } from "node:process";
import { UserModel } from "./users.model.js";
export const TaskModel = sequelize.define("Task", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING(100),
    unique: false,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  isComplete: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
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
UserModel.hasMany(TaskModel, {
  foreignKey: "user_id",
  as: "tasks",
});
TaskModel.belongsTo(UserModel, {
  foreignKey: "user_id",
  as: "user",
});
