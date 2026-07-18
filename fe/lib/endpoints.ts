export const endpoints = {
    auth: {
        me: "/auth/me",
        login: "/auth/login",
        register: "/auth/register"
    },
    homePage: {
        trending: "/home",
        bestSellers: "/home"
    },
    product:{
        allProducts: "/products",
        singleProduct: (id:string) => `/product/${id}`
    }
   
}