import mongoose from "mongoose";
import environment from "./environment.js";

mongoose.set( "strictQuery", false)

const mongoConexionString = environment.DB_CONEXION_STRING

export const startConnection = ()=> {
    mongoose.connect( mongoConexionString).then( () => console.log ("Conexion a la base MONGO fue exitosa"))
    .catch( error => console.error( error))
}

const db = mongoose.connect

export default db