import express from "express";
import environment from "./././config/environment.js";
import userRouter from "./././resourses/user/routes/user.routes.js";
import { startConnection } from "./config/database.js";
import cors from 'cors';


const { PORT } = environment

startConnection()

const app = express()
app.use( express.json())
app.use(cors())

app.get('/', function(req,res){
    return res.status( 200).json({ msg: "bienvenido"})
})



app.use(userRouter)

app.listen(PORT, () => {
    console.log ( `Aplicacion iniciada en puerto ${ PORT } `)
})