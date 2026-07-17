import { fetchProducts, fetchSingleProduct } from "./products.repository.js";

export const fetchProductService = async() => {
    return await fetchProducts()
}

export const fetchSingleProductService = async(productId) => {
    if(!productId){
        throw{
            statusCode: 400,
            message: "productId is required"
        }
    }
    return await fetchSingleProduct(productId);
}