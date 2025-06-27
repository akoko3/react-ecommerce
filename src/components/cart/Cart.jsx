import { useState } from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="cart-container">
      <h1 className="cart-title">Shopping Cart</h1>
      {cart.length > 0 ? (
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} className="cart-image" />
              <div className="cart-details">
                <h3 className="cart-item-title">{item.title}</h3>
                <p className="cart-item-price">${item.price.toFixed(2)}</p>
              </div>
              <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))}
        </div>
      ) : (
        <p className="cart-empty">Your cart is currently empty. <Link to="/" className="cart-link">Fill it up</Link></p>
      )}
    </div>
  );
};

export default Cart;
