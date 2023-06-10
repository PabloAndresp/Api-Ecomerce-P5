import  { UserModel} from "../models/user.model.js"

const user = []

export async function createUser( req, res){
    const body = req.body
    const userCreated = await UserModel.create(body)
    return res.status( 201).json( userCreated)
}

export function getUser( req, res){
    return res.status( 200).json( user)
}

export function getuserById( req, res) {
    const id = req.params.id

    const userfound = user.find( user => user.id === id)
    if ( !userfound){
        return res.status( 404).json( { status: "error", msg: "usuario no encontrado"})
    }
    return res.status( 200).json( userfound)
}