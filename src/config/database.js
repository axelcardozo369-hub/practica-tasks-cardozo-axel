import { Sequelize } from "sequelize";

//creo la conexion con la base de datos que cree en phpmyadmind
const sequelize = new Sequelize('tasks_users_db','root','',{
host:'localhost',
dialect:'mysql',
port:3306,
});
export default sequelize;