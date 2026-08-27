import express from "express";
import sequelize from "./src/config/database.js";

import { TaskModel } from "./src/models/tasks.model.js";
import { UserModel } from "./src/models/users.model.js";
import { routerTask } from "./src/routes/taks.routes.js";
import { routerUsers } from "./src/routes/users.routes.js";
import { profileRoutes } from "./src/routes/profile.routes.js";
import { ProfileModel } from "./src/models/profile.model.js";
import { projectRouter } from "./src/routes/projects.routes.js";
import { CategoryModel } from "./src/models/category.model.js";
import { categoryRouter } from "./src/routes/category.routes.js";
import { projectCategoryModel } from "./src/models/project.category.model.js";
import { projecCategRouter } from "./src/routes/project_category.routes.js";

const app = express();
const PORT = 3005;
app.use(express.json());
const probarConexionDataBase = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("Conexion con tu base de datos exitosa Axel");
    await sequelize.sync();
    console.log("Tablas de usuarios y de las tareas conectadas correctamente");
  } catch (error) {
    console.log(
      "No se pudo hacer la conexion de tu base de datos, corrige el error",
      error,
    );
  }
};
probarConexionDataBase();

app.use("/api", routerTask);
app.use("/api", routerUsers);
app.use("/api/", profileRoutes);
app.use("/api/", projectRouter);
app.use("/api/", categoryRouter);
app.use("/api/", projecCategRouter);

app.listen(PORT, () => {
  console.log(`Servidor Funcionando `);
  console.log(`enlace servidor: http://localhost:${PORT}`);
});
