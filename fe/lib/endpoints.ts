export const endpoints = {
    auth: {
        me: "/auth/me",
        login: "/auth/login",
        register: "/auth/register"
    },
    product:{
        allProducts: "/products",
        singleProduct: (id:string) => `/product/${id}`
    }
   
}