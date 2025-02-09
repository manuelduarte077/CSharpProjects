import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Product } from "./types";

const fetchProducts = async (): Promise<Product[]> => {
  const { data } = await axios.get<Product[]>(
    "https://fakestoreapi.com/products"
  );

  return data;
};

export const useProductsQuery = () => {
  return useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 60000,
  });
};
