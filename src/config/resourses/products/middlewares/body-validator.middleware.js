export const bodyValidatorMiddleware = (req, res, next) => {
    const body = req.body
    if (body.name) {
        return res.status(400).json ( { status: "error", msg: "el nombre no puede ser vacio"})
    }
    next()
}