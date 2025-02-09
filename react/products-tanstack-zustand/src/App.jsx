import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queryClient";
import ProductList from "./ProductList";
import ProductDetails from "./ProductDetails";

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ProductList />
      <ProductDetails />
    </QueryClientProvider>
  );
};

export default App;
