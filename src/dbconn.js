import Sequelize from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

export const dbConnection = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: (process.env.DISABLE_DB_LOGS != "true"),
    pool: {
        max: 5,
        min: 0,
        require: 30000,
        idle: 10000
    },
    timezone: 'America/Guatemala'
});