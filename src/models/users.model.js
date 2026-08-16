import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import { TaskModel } from "./tasks.model.js";
import { ProfileModel } from "./profile.model.js";
export const UserModel = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    unique: false,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
});

UserModel.hasOne(ProfileModel, { foreignKey: "user_id", as: "profile" });
ProfileModel.belongsTo(UserModel, { foreignKey: "user_id", as: "user" });
