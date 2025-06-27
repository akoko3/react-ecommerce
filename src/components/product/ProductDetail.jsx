import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ProductDetail = () => {
    const { id } = useParams(); 
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`https://fakestoreapi.com/products/${id}`);

                if (!response.ok) {
                    throw new Error("Failed to load product");
                }

                const data = await response.json();
                setProduct(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const isInCart = cart.find((item) => item.id === product?.id);
    const quantity = isInCart ? isInCart.quantity : 0;

    const addToCart = () => {
        toast.success("Item Added to Cart")
        const updatedCart = [...cart, { ...product, quantity: 1 }];
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const updateQuantity = (amount) => {
        const updatedCart = cart.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + amount } : item
        ).filter((item) => item.quantity > 0);

        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    if (loading) return <h1 className="loading">Loading...</h1>;
    if (error) return <h1 className="error">Error: {error}</h1>;

    return (
        <div className="product-detail-container" >
           

            <div className="product-detail " >
                <img src={product.image} alt={product.title} className="detail-image" />
                <div className="detail-info">
                    <h2 className="detail-title">{product.title}</h2>
                    <p className="detail-description">{product.description}</p>
                    <p className="detail-price"><strong>Price:</strong> ${product.price.toFixed(2)}</p>
                    <p className="detail-category"><strong>Category:</strong> {product.category}</p>

                    <div className="cart-actions">
                        {quantity === 0 ? (
                            <button className="add-to-cart-btn" onClick={addToCart}>Add to Cart</button>
                        ) : (
                            <div className="quantity-control">
                                <button className="quantity-btn" onClick={() => updateQuantity(-1)}>-</button>
                                <span className="quantity-count">{quantity}</span>
                                <button className="quantity-btn" onClick={() => updateQuantity(1)}>+</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};


export default ProductDetail;
