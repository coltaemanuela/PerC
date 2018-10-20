import React from 'react';
import Top from './Top';
import Middle from './Middle';
import Bottom from './Bottom';

const Layout = ({ children }) => {
    return (
        <main>
            <div className="wrapper">
                {children}
            </div>
        </main>
    );
};

export {
    Layout,
    Top,
    Middle,
    Bottom
};
