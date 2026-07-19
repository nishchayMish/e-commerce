export const endpoints = {
  auth: {
    me: "/auth/me",
    login: "/auth/login",
    register: "/auth/register",
  },
  homePage: {
    products: "/home",
  },
  product: {
    allProducts: (limit: number, page: number, category?: string | null) => {
      let url = `/products?page=${page}&limit=${limit}`;

      // agar category selected hai to query me add kar do
      if (category) {
        url += `&category=${category}`;
      }

      return url;
    },
    singleProduct: (id: string) => `/products/${id}`,
  },
};
