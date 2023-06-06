export const paramsValidatorMiddleware = (req, res, next) => {
    if ( ! id ) {
        return res.status( 400).json( { status: "error", msg: "debe proporcionar el id del producto en la request"})
    }
    next()
}