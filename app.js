import express from "express";

const app = express();
const puerto = 3500;
app.use(express.json());

app.use("/", (req, res) => {
  return res.json({ mensaje: "Servidor funcionando" });
});
app.listen(puerto, () => {
  console.log(`Servidor Funcionando `);
  console.log(`enlace servidor: http://localhost/${puerto}`);
});
