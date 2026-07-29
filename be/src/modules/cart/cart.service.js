import { addToCart, createCart, createGuestCart, deleteFromCart, fetchCartItems, findGuestCart, findItem, findUsersCart, getCart, getGuestCart, updateCart, updateCartQuantity } from "./cart.repository.js";

export const addToCartService = async(pId, userId, guestId) => {
    if(userId){
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

    if(guestId){
        const cart = await findGuestCart(guestId);

        if(!cart){
            const result = await createGuestCart(guestId);

            return await addToCart(result.id, pId, 1);
        }

        const item = await findItem(pId, cart.id)

        if(item){
            return await updateCartQuantity(cart.id, pId);
        }

        return await addToCart(cart.id, pId, 1);
    }
}

export const getCartService = async(userId, guestId) => {
    if(userId){
        const cart = await getCart(userId);

        if(!cart){
            return {message: "Cart is Empty"}
        }

        return await fetchCartItems(cart.id)
    }
    
    if(guestId){
        const cart = await getGuestCart(guestId);

        if(!cart){
            return {message: "Cart is Empty"}
        }

        return await fetchCartItems(cart.id)
    }
}

export const updateCartService = async(userId, guestId, pId, action) => {
    if(userId){
        const cart = await getCart(userId);

        if(!cart){
            throw{
                statusCode: 400,
                message: "Cart is Empty"
            }
        }

        return await updateCart(cart.id, pId, action);
    }

    if(guestId){
        const cart = await getGuestCart(guestId);
        if(!cart){
            throw{
                statusCode: 400,
                message: "Cart is Empty"
            }
        }

        return await updateCart(cart.id, pId, action);
    }
}

export const deleteCartService = async(pId, userId, guestId) => {

    if(userId){
        const cart = await getCart(userId);
    
        if(!cart){
            throw{
                statusCode: 400,
                message: "Cart is Empty"
            }
        }
        
        return await deleteFromCart(cart.id, pId);
    }  
    
    if(guestId){
        const cart = await getGuestCart(guestId);
        if(!cart){
            throw{
                statusCode: 400,
                message: "Cart is Empty"
            }
        }
        
        return await deleteFromCart(cart.id, pId);
    }

}