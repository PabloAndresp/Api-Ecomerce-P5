import { Router} from "espress"
import { createProduct, deleteById, getProductById,
getProducts, updateProductById } from "../controllers/products.controller.js"
import { paramsValidatorMiddleware } from "../middlewares/params-validator.middleware.js"


const productsRouter = Router()

//http://localhost:4000/products
const baseURI = "/products"

productsRouter.post( baseURI, logginMiddleware, bodyValidatorMiddleware,createProduct)
productsRouter.get( baseURI, getProducts)
productsRouter.get( ´${baseURI }/:id´,paramsValidatorMiddleware, getProductById)
productsRouter.put( ´${ baseURI }/:id´,updateProductById)
productsRouter.patch( ´${ baseURI }/:id´)
productsRouter.delete( ´${ baseURI }/:id´, deleteById)

export default productsRouter