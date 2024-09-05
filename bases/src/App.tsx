import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import { UserPage } from "./UserPage";

function App() {
  return (
    <AuthProvider>
      <UserPage />
    </AuthProvider>
  );
}

export default App;
