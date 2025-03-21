import React, { useState, useEffect, useContext } from 'react'; // Dodajte useState i useEffect
import { useLocation } from 'react-router-dom';
import NavBar from "./NavBar";
import menuItems from './data.jsx';
import { CartContext } from './CartContext'; // Importujte CartContext

export default function Categories() {
    const location = useLocation();
    const initialCategory = location.state?.category || null;
    const [activeCategory, setActiveCategory] = useState(initialCategory);
    const { handleAddToCart } = useContext(CartContext); // Koristite kontekst

    useEffect(() => {
        setActiveCategory(location.state?.category || null);
    }, [location.state]);

    return (
        <div id="category" className="categories-section">
            <NavBar />
            <div className="category-header">
                <h1 className="discover-title">Discover Our Menu</h1>
                <h5>Click on the image to order</h5>
            </div>
            <div className="category-buttons">
                {menuItems.map((category, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveCategory(category.category)}
                        className={activeCategory === category.category ? "active" : ""}
                    >
                        {category.category}
                    </button>
                ))}
            </div>
            <div className="menu-section">
                {menuItems
                    .filter((category) => !activeCategory || category.category === activeCategory)
                    .map((category, index) => (
                        <div key={index} className="category">
                            <h2>{category.category}</h2>
                            <div className="items">
                                {category.items.map((item, itemIndex) => (
                                    <div key={itemIndex} className="item">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            onClick={() => handleAddToCart(item)}
                                            style={{ cursor: "pointer" }}
                                        />
                                        <h3>{item.name}</h3>
                                        <p>{item.description}</p>
                                        <p className="price">${item.price}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}