import express, { json} from "express"

const app = express()
app.use(json())

app.get("/", function(req,res){
    return res.send({"msg": "hola mundo"})
})

app.listen(3000)