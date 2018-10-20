import React from 'react';

const Burger = () => {
    const toggleMenu = e => {
        document.body.classList.toggle('main-nav-open');
    };
    return (
        <button className="burger" onClick={toggleMenu}></button>
    );
};

export default Burger;