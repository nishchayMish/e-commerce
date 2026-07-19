export const endpoints = {
    auth: {
        me: "/auth/me",
        login: "/auth/login",
        register: "/auth/register"
    },
    homePage: {
        products: "/home",
    },
    product:{
        allProducts: (limit: number, page: number) =>  `/products?page=${page}&limit=${limit}`,
        singleProduct: (id: string) => `/products/${id}`,
    }
   
}