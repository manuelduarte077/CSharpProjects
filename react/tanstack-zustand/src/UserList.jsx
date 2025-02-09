import { useUsersQuery } from "./useUsersQuery";
import { useUserStore } from "./useUserStore";

const UserList = () => {
  // Obtener datos de la API usando React Query
  const { data: users, isLoading, error } = useUsersQuery();
  // Obtener la función para actualizar el usuario seleccionado de Zustand
  const setSelectedUser = useUserStore((state) => state.setSelectedUser);

  // Mostrar un mensaje de carga mientras se obtienen los datos
  if (isLoading) return <p>Loading users...</p>;
  // Manejar errores en la petición
  if (error) return <p>Error loading users</p>;

  return (
    <div>
      <h2>Users List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id} onClick={() => setSelectedUser(user)}>
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
