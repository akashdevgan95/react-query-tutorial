import React, { useEffect, useState } from "react";

const ProductsTable = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch("/getAllProducts")
      .then((res) => res.json)
      .then((data) => setProducts(data))
      .catch((err) => setError(true));
  }, []);

  if (loading) {
    return <h1>Loading products...</h1>;
  }

  if (error) {
    return <h1>Unable to fetch products. Please try again later.</h1>;
  }

  return (
    <div>
      {products.map((product, i) => (
        <p key={i}>{product.name}</p>
      ))}
    </div>
  );
};

export default ProductsTable;
