import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queryClient";
import UserList from "./UserList";
import UserDetails from "./UserDetails";

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <h1>React Query + Zustand Example</h1>
      <UserList />
      <UserDetails />
    </QueryClientProvider>
  );
};

export default App;
