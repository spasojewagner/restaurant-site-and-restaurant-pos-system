// NavBar.js
import React, { useContext,useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from './assets/logo2.png';
import { CartContext } from './CartContext'; 

export default function NavBar() {
    const { cart, setShowCart } = useContext(CartContext);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const location = useLocation();

    return (
        <nav>
            <img src={logo} alt="" />
            <ul>
                <li>
                    <Link
                        to="/"
                        className={location.pathname === "/" ? "active-link" : ""}
                    >
                        Home
                    </Link>
                </li>
                <li className="dropdown"
                    onMouseEnter={() => setIsDropdownOpen(true)}
                    onMouseLeave={() => setIsDropdownOpen(false)}
                >
                    <Link
                        id="zuta"
                        to="/categories"
                        className={location.pathname.startsWith("/categories") ? "active-link" : ""}
                    >
                        Categories
                    </Link>
                    {isDropdownOpen && (
                        <ul className="dropdown-menu">
                            <li><Link id="burgers" to="/categories" state={{ category: "Burgers" }}>Burgers</Link></li>
                            <li><Link id="pizzas" to="/categories" state={{ category: "Pizzas" }}>Pizzas</Link></li>
                            <li><Link id="drinks" to="/categories" state={{ category: "Drinks" }}>Drinks</Link></li>
                            <li><Link id="desserts" to="/categories" state={{ category: "Desserts" }}>Desserts</Link></li>
                        </ul>
                    )}
                </li>
                <li>
                    <Link
                        to="/services"
                        className={location.pathname === "/services" ? "active-link" : ""}
                    >
                        Services
                    </Link>
                </li>
                <li>
                    <Link
                        to="/about"
                        className={location.pathname === "/about" ? "active-link" : ""}
                    >
                        About
                    </Link>
                </li>
                <li>
                    <Link
                        to="/reviews"
                        className={location.pathname === "/reviews" ? "active-link" : ""}
                    >
                        Reviews
                    </Link>
                </li>
                <li>
                    <Link
                        to="/contact"
                        className={location.pathname === "/contact" ? "active-link" : ""}
                    >
                        Contact Us
                    </Link>
                </li>
            </ul>
            <div className="nav-buy">
                <Link to="/cart" className="btn-nav-1" style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cart-check-fill" viewBox="0 0 16 16">
                        <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m-1.646-7.646-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L8 8.293l2.646-2.647a.5.5 0 0 1 .708.708" />
                    </svg>
                    <span>({cart?.length || 0})</span>
                </Link>

                <button className="btn-nav-2" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone-outbound-fill" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877zM11 .5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V1.707l-4.146 4.147a.5.5 0 0 1-.708-.708L14.293 1H11.5a.5.5 0 0 1-.5-.5" />
                    </svg>
                    +381 32 302700
                </button>
            </div>
        </nav>
    );
}