import React, { useState, useEffect } from "react";

const Counter = ({ target }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 1;
        const duration = 2000; // Trajanje animacije u ms
        const intervalTime = Math.floor(duration / target);
        
        const timer = setInterval(() => {
            start += 1;
            setCount(start);
            if (start >= target) {
                clearInterval(timer);
            }
        }, intervalTime);

        return () => clearInterval(timer);
    }, [target]);

    return <span>{count}</span>;
};

export default Counter;
