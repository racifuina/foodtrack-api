import app from './app';
import { dbConnection } from './dbconn';

function main() {
    app.listen(process.env.PORT, () => {
        console.log(`Servidor iniciado en Puerto: ${process.env.PORT}`);
    });

    dbConnection.authenticate().then(() => {
        console.log(`Conexion con el servidor de base de datos OK. DB: ${process.env.DB_DATABASE}`);
        //     return dbConnection.sync({ alter: true })
        // }).then(() => {
        //     console.log(`Modelos sincronizados. DB: ${process.env.DB_DATABASE}`);
    }).catch(err => {
        console.error(`Conexion fallida con el servidor de base de datos. DB: ${process.env.DB_DATABASE}`, err);
    });
}

process.on("uncaughtException", err => {
    console.error("uncaughtException", err);
});

process.on('unhandledRejection', err => {
    console.error("unhandledRejection", err);
});

main();