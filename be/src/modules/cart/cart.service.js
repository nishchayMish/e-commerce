import { addToCart, createCart, fetchCartItems, findItem, findUsersCart, getCart, updateCartQuantity } from "./cart.repository.js";

export const addToCartService = async(pId, userId) => {
    const cart = await findUsersCart(userId);

    if(!cart){
        const result = await createCart(userId);

        return await addToCart(result.id, pId, 1);
    }

    const item = await findItem(pId, cart.id)

    if(item){
        return await updateCartQuantity(cart.id, pId);
    }

    return await addToCart(cart.id, pId, 1);
}

export const getCartService = async(userId) => {
    const cart = await getCart(userId);

    if(!cart){
        return {message: "Cart is Empty"}
    }

    return await fetchCartItems(cart.id)
}