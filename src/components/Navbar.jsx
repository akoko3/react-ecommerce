import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar">
            <span className="store-name">MIMI STORE</span>
            <div className="nav-links">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/cart" className="nav-link">Cart</Link>
                <Link to="/login" className="nav-link">Login</Link>
            </div>
        </nav>
    );
}

export default Navbar;
