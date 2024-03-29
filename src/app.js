import express from 'express'
import { startConnection } from './config/database.js'
import environment from './config/environment.js'
import authRoutes from './resources/auth/routes/auth.routes.js'
import productsRouter from './resources/products/routes/products.routes.js'
import usersRouter from './resources/users/routes/users.routes.js'
import cors from "cors"

const app = express()

startConnection()

app.use( express.json() )
app.use( cors() )

app.get( '/', function ( req, res ) {
  return res.status( 200 ).json( { msg: "Bienvenido" } )
} )

app.use( usersRouter )
app.use( productsRouter )
app.use( authRoutes )

const { PORT } = environment
app.listen( PORT, () => {
  console.log( `Aplicación iniciada en puerto ${ PORT }` )
} )