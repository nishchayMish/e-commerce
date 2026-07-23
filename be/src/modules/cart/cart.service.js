import { addToCart, createCart, findItem, findUsersCart, updateCartQuantity } from "./cart.repository.js";

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
