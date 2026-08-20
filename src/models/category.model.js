import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import { ProjectModel } from "./project.model.js";

export const CategoryModel = sequelize.define("category", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
});
// CategoryModel.hasMany(ProjectModel, {
//   foreignKey: "category_id",
//   as: "projects",
// });
// ProjectModel.belongsTo(CategoryModel, {
//   foreignKey: "category_id",
//   as: "category",
// });
