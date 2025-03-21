import React, { useState, useEffect, useRef } from "react";
import Counter from "./Counter";

const StatsSection = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.5 } // Aktivira se kada je 50% sekcije vidljivo
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    return (
        <div ref={sectionRef} className="stats-section">
            <div className="stat">
                {isVisible ? <Counter target={100} /> : 1}
                <p>MENU ITEMS</p>
            </div>
            <div className="stat">
                {isVisible ? <Counter target={300} /> : 1}+
                <p>VISITORS EVERYDAY</p>
            </div>
            <div className="stat">
                {isVisible ? <Counter target={12} /> : 1}
                <p>YEARS OF EXPERIENCE</p>
            </div>
        </div>
    );
};

export default StatsSection;
