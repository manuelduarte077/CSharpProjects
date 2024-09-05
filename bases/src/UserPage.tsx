import { useUser } from "./useUser";

export const UserPage = () => {
  const { users, nextPage, prevPage } = useUser();

  console.log(users);

  return (
    <div>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
          <th></th>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <img src={user.avatar ?? ''} alt="avatar" />
              </td>
              <td>{user.id}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>


      </table>

      {/* Botttones de paginacion */}
      <div>
        <button onClick={prevPage}>Anterior</button>
        <button onClick={nextPage}>Siguiente</button>

       
      </div>
    </div>
  );
};
