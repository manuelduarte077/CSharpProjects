import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Función que obtiene los usuarios desde una API
const fetchUsers = async () => {
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  return data; // Devuelve la lista de usuarios
};

// Hook personalizado que utiliza React Query para obtener la lista de usuarios
export const useUsersQuery = () => {
  return useQuery({
    queryKey: ["users"], // Clave de la caché en React Query
    queryFn: fetchUsers, // Función que realiza la petición
  });
};
