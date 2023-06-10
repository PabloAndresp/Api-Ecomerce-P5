import { Router} from "express"
import { createUser, 
getUser,  } from "../controllers/user.controller.js"
import {bodyValidatorMiddleware} from "../../../config/middlewares/body-validator.middleware.js"
import {logginMiddleware} from "../../../config/middlewares/looging.midddleware.js"
import {paramsValidatorMiddleware} from "../../../config/middlewares/params-validator.middleware.js"



const userRouter = Router()

//http://localhost:4000/user
const baseURI = "/user"

userRouter.post( baseURI, logginMiddleware, bodyValidatorMiddleware,createUser)
userRouter.get( baseURI, getUser)
userRouter.get( `${baseURI }/:id`,paramsValidatorMiddleware,)
userRouter.put( `${ baseURI }/:id`)
userRouter.patch( `${ baseURI }/:id`)
userRouter.delete( `${ baseURI }/:id`)

export default userRouter