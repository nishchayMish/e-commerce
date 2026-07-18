import http from "@/lib/http";
import { endpoints } from "@/lib/endpoints";
import type { HomeProductsResponse } from "@/lib/types";

export const getHomeProducts = async (): Promise<HomeProductsResponse> => {
  const res = await http.get<HomeProductsResponse>(endpoints.homePage.products);
  return res.data;
};
