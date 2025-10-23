import mongoose from "mongoose";
import chalk from "chalk";

const { DB_PROTOCOL, DB_HOST, DB_USER, DB_PASS, DB_NAME } = process.env;

const connectDb = async () => {
  try {
    let connectionString = `${DB_PROTOCOL}${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;
    console.log(
      chalk.blue("Intentando conectar a:"),
      `${DB_PROTOCOL}${DB_HOST}/${DB_NAME}`
    );

    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(chalk.green("Conectado a MongoDB Atlas"));
  } catch (err) {
    console.error(chalk.bgRed.white("Error de conexión a MongoDB:"));
    console.error(err.message);
  }
};

const disconnectDb = async () => {
  try {
    await mongoose.connection.close();
    console.log(chalk.yellow("🔌 Desconectado de MongoDB"));
  } catch (err) {
    console.error(chalk.red("Error al desconectarse:"), err);
  }
};

export { connectDb, disconnectDb };
