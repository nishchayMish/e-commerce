export const sanitizedAddToCart = (req, res, next) => {
    const { pId } = req.body
    if(!pId){
        return res.status(400).json({
            message: "product id is required"
        })
    }
    next();
}

export const updateCartSanitizedInput = (req, res, next) => {
    const { pId, action } = req.body
    if(!pId){
        return res.status(400).json({
            message: "product id is required"
        })
    }

    if(!action){
        return res.status(400).json({
            message: "action is required"
        })
    }
    next();
}

export const sanitizedDeleteFromCart = (req, res, next) => {
    const { pId } = req.body
    if(!pId){
        return res.status(400).json({
            message: "product id is required"
        })
    }
    next();
}