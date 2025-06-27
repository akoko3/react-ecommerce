import { useEffect, useState } from "react";
import "./styles.css"; 

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("https://fakestoreapi.com/products");

                if (!response.ok) {
                    throw new Error("Failed to load products");
                }

                const data = await response.json();
                setProducts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <h1 className="loading">Loading...</h1>;
    if (error) return <h1 className="error">Error: {error}</h1>;

    return (
        <div className="container">
            <h2 className="title">All Products</h2>
            <ul className="product-list">
                {products.map(product => (
                    <li key={product.id} className="product-item">
                        <a href={`/product/${product.id}`} className="product-link">
                            <h3 className="product-title">{product.title}</h3>
                            <img src={product.image} alt={product.title} className="product-image" />
                            <p className="product-price">${product.price}</p>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
