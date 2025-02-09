import { useProductsQuery } from "./useProductsQuery";
import { useProductStore } from "./useProductStore";

const ProductList = () => {
  const { data: products, isLoading, error } = useProductsQuery();

  const setSelectedProduct = useProductStore(
    (state) => state.setSelectedProduct
  );

  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Error loading products</p>;

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map((product) => (
          <li
            key={product.id}
            onClick={() => setSelectedProduct(product)}
            style={{ cursor: "pointer" }}
          >
            <img src={product.images[0]} alt={product.title} width="50" />
            {product.title} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
