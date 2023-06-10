import * as dotenv from "dotenv"

// carga las variables de entorno del .env en process.env
dotenv.config()

export default {
    PORT: process.env.PORT || 4500,
    DB_CONEXION: process.env.DB_CONEXION
}