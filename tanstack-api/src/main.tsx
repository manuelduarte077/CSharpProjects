import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ProductList from "./product/ProductList";
import { queryClient } from "./api/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ProductList />
    </QueryClientProvider>
  </StrictMode>
);
