import * as dotenv from "dotenv"

// carga las variables de entorno del .env en process.env
dotenv.config()

export default {
    PORT: process.env.PORT || 3000,
    DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING,
    TOKEN_SECRET: process.env.TOKEN_SECRET
}