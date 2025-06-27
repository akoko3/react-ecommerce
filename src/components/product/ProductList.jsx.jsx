import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);

  useEffect(() => {
    // Fetch Products
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));

    // Fetch Categories
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(["All Products", ...data]));
  }, []);

  // Save cart to localStorage when cart state changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Handle Quantity Change
  const addToCart = (product) => {
    toast.success("Item Added to Cart")
    const updatedCart = [...cart, { ...product, quantity: 1 }];
    setCart(updatedCart);
  };

  const updateQuantity = (id, amount) => {
    
    const updatedCart = cart
      .map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + amount } : item
      )
      .filter((item) => item.quantity > 0);

    setCart(updatedCart);
  };

  // Filtering Logic
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedCategory === "All Products" || product.category === selectedCategory)
  );

  return (
    <div>
      <h1>Product List</h1>

      {/* Search & Category Filter */}
      <div className="search-filter" >
        <input
          type="text"
          placeholder="Search products..."
          className="search-input" style={{borderRadius: '10px'}}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select className="filter-dropdown"
          onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Product Grid */}
      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => {
            const cartItem = cart.find((item) => item.id === product.id);
            const quantity = cartItem ? cartItem.quantity : 0;

            return (
              <div key={product.id} className="product-card">
                <Link to={`/product/${product.id}`} >
                  <img src={product.image} alt={product.title} className="product-image" />
                  <h3 className="product-title">{product.title}</h3>
                  <p  className="product-price">${product.price}</p>
                </Link>
                
                {/* Add to Cart */}
                {quantity === 0 ? (
                  <button onClick={() => addToCart(product)} style={{backgroundColor: '#dfe1ee', border: 'none'}}>Add to Cart</button>
                ) : (
                  <div  className="quantity-controls">
                    <button onClick={() => updateQuantity(product.id, -1)}>-</button>
                    <span>{quantity}</span>
                    <button onClick={() => updateQuantity(product.id, 1)}>+</button>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
