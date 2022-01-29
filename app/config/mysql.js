const { Sequelize } = require("sequelize");
const mysql = require("mysql2/promise");
var dotenv = require('dotenv')
dotenv.config()

const PORT = process.env.MYSQL_PORT;
const  HOST = process.env.MYSQL_HOST;
const  DATABASE = "sprint4-jwt";
const  USERNAME = process.env.MYSQL_USERNAME;
const  PASSWORD = process.env.MYSQL_PASSWORD;

const sequelize = new Sequelize(DATABASE, USERNAME, PASSWORD, {
  HOST,
  dialect: "mysql",
  PORT,
  define: {
    timestamps: false,
    raw: true,
  },
  logging: false, // Quita el registro de ejecuciones SQL
});

const connectSequelize = async () => {
  try {
    // Create database if it does not exist/
    const connection = await mysql.createConnection({
      port: PORT,
      user: USERNAME,
      password: PASSWORD,
    });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DATABASE}\`;`);
    // ************** */
    await sequelize.sync({ force: false });
    console.log("Connection to mySQL-DB has been established successfully.");


  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit();
  }
};

module.exports = { checkDB: connectSequelize, sequelize };
