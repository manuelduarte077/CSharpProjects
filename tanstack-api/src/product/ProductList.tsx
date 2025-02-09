import React, { useState } from "react";
import { useProductsQuery } from "../useProductsQuery";
import { Product } from "../types";
import "./ProductList.css";

const ProductList: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { data: products, isLoading, error } = useProductsQuery();

  if (isLoading) return <p className="loading">Loading products...</p>;
  if (error) return <p className="error">Error loading products</p>;

  return (
    <div className="container">
      <h2 className="title">Products</h2>

      <div className="content">
        {/* Lista de Productos */}
        <div className="product-list">
          {products?.map((product) => (
            <div
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              className={`product-card ${selectedProduct?.id === product.id ? "selected" : ""}`}
            >
              <img src={product.image} alt={product.title} className="product-image" />
              <h3 className="product-title">{product.title}</h3>
              <p className="product-price">${product.price.toFixed(2)}</p>
            </div>
          ))}
        </div>

        {/* Detalles del Producto Seleccionado */}
        <div className="product-details">
          {selectedProduct ? (
            <>
              <h3 className="details-title">Product Details</h3>
              <img src={selectedProduct.image} alt={selectedProduct.title} className="details-image" />
              <h3 className="details-name">{selectedProduct.title}</h3>
              <p className="details-price">${selectedProduct.price.toFixed(2)}</p>
              <p className="details-description">{selectedProduct.description}</p>
            </>
          ) : (
            <p className="details-placeholder">Select a product to see details</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;