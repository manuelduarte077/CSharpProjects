import { Product } from "@/types/Product";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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
