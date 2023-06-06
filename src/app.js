import express from "express";
import environment from "./config/environment.js";


const { PORT } = environment

const app = express()
app.use( express.json())

app.get("/", function(req,res){
    return res.send( "hola mundo")
})

// rutas de los recursos

app.use(productsRouter)

app.listen(PORT, () => {
    console.log (´APLICACION INICIARA EN EL PUERTO ${PORT}´)
})