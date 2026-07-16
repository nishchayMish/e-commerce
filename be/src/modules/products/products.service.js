import { fetchProducts } from "./products.repository.js";

export const fetchProductService = async() => {
    return await fetchProducts()
}