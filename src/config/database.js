import mongoose from "mongoose";
import environment from "./environment.js";

mongoose.set( "strictQuery", false)

const mongoConnectionString = environment.DB_CONNECTION_STRING

export const startConnection = async ()=> {
    mongoose.connect( mongoConnectionString).then( () => console.log ("Conexion a la base MONGO fue exitosa"))
    .catch( error => console.error( error))
}

const db = mongoose.connection

export default db