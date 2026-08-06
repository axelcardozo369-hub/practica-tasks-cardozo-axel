import express from "express";
import sequelize from "./src/config/database.js";

const app = express();
const puerto = 3500;
app.use(express.json());
const probarConexionDataBase = async () =>{
  try {
    await sequelize.authenticate();
    console.log('Conexion con tu base de datos exitosa Axel')
  } catch (error) {
    console.log('No se pudo hacer la conexion de tu base de datos, corrige el error',error);
  }
}
probarConexionDataBase();
app.use("/", (req, res) => {
  return res.json({ mensaje: "Servidor funcionando" });
});
app.listen(puerto, () => {
  console.log(`Servidor Funcionando `);
  console.log(`enlace servidor: http://localhost/${puerto}`);
});
