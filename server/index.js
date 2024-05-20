import express from "express";
import cors from "cors";
import "./loadEnvironment.js";
import "express-async-errors";
import sequelize from './db.js';
import * as models from './models/models.js'
import router from './routes/index.js'
import ErrorHandler from './middleware/ErrorHandlingMiddleware.js';

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', router);

// Обработка ошибок, последний Middleware
app.use(ErrorHandler)

const start = async () => {
  try {
    await sequelize.authenticate();
    // await sequelize.sync({alter: true});
    // await sequelize.sync({force: true});
    app.listen(PORT, (err) => {
      err ? console.log('Error on server running: ', err) : console.log(`Server is running on port: ${PORT}`);
    });
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error, `env: ${process.env.NODE_ENV}`);
  }
}

start().then(() => console.log('node started'));


