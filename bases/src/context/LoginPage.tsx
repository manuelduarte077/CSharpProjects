import { useAuthContext } from "./AuthContext";


export const LoginPage = () => {
  const { isChecking, isAuthenticated, loginWithEmailPassword, logout, user } =
    useAuthContext();

  if (isChecking) {
    return <div>Loading</div>;
  }

  const handleLogin = () => {
    loginWithEmailPassword("1", "1");
  };

  const handleLogout = () => {
    logout();
  };


  return (
    <>
      {isAuthenticated ? (
        <>
          <pre>{JSON.stringify(user, null, 2)}</pre>

          <div>Logged in</div>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <div>Login</div>
          <button onClick={handleLogin}>
            Login
          </button>
        </>
      )}
    </>
  );
};

