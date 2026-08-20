import { DataTypes } from "sequelize";
import { ProjectModel } from "./project.model.js";
import { CategoryModel } from "./category.model.js";
import sequelize from "../config/database.js";

export const projectCategoryModel = sequelize.define("project_category", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

CategoryModel.belongsToMany(ProjectModel, {
  through: projectCategoryModel,
  foreignKey: "category_id",
  as: "projects",
});
ProjectModel.belongsToMany(CategoryModel, {
  through: projectCategoryModel,
  foreignKey: "project_id",
  as: "categories",
});
