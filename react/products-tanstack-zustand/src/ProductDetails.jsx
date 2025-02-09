import { useProductStore } from "./useProductStore";

const ProductDetails = () => {
  const selectedProduct = useProductStore((state) => state.selectedProduct);

  if (!selectedProduct) return <p>Select a product to see details.</p>;

  return (
    <div>
      <h2>Product Details</h2>
      <img
        src={selectedProduct.images[0]}
        alt={selectedProduct.title}
        width="200"
      />
      <p>
        <strong>Name:</strong> {selectedProduct.title}
      </p>
      <p>
        <strong>Price:</strong> ${selectedProduct.price}
      </p>
      <p>
        <strong>Description:</strong> {selectedProduct.description}
      </p>
    </div>
  );
};

export default ProductDetails;
