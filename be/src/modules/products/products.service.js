import { bestSellerProducts, fetchHomeProducts, fetchProducts, fetchSingleProduct } from "./products.repository.js";

export const fetchProductService = async(page, limit, filters) => {
    if(page <= 0){
        throw{
            status: 400,
            message: "Invalid page number"
        }
    }
    if(limit <= 0){
        throw{
            status: 400,
            message: "Invalid limit"
        }
    }
    const offset = (page - 1) * limit;
    return await fetchProducts(offset, limit, page, filters)
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

export const fetchHomeProductsService = async() => {
    const allProducts = await fetchHomeProducts();
    const bestsellerProducts = await bestSellerProducts();
    const trendingProducts = {};

    for (const product of allProducts) {
        if (!trendingProducts[product.category]) {
            trendingProducts[product.category] = [];
        }

        trendingProducts[product.category].push(product);
    }

   const categories = Object.keys(trendingProducts)

    return {categories, trendingProducts, bestsellerProducts};
}
