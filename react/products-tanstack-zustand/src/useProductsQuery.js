import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchProducts = async () => {
  const { data } = await axios.get(
    "https://api.escuelajs.co/api/v1/products"
  );

  console.log("fetchProducts", data);

  return data;
};

export const useProductsQuery = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 60000,
  });
};

