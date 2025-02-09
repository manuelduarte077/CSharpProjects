import { useUserStore } from "./useUserStore";

const UserDetails = () => {
  // Obtener el usuario seleccionado desde Zustand
  const selectedUser = useUserStore((state) => state.selectedUser);

  // Si no hay usuario seleccionado, mostrar un mensaje
  if (!selectedUser) return <p>Select a user to see details.</p>;

  return (
    <div>
      <h2>User Details</h2>
      <p>
        <strong>Name:</strong> {selectedUser.name}
      </p>
      <p>
        <strong>Email:</strong> {selectedUser.email}
      </p>
    </div>
  );
};

export default UserDetails;
