import React from 'react';
import PropTypes from 'prop-types';

const LogoUrl = "../../assets/toolkit/images/stewardship-logo-white.svg";

const Logo = () => (
    <a href="/" title="Stewardship" className="logo">
        <img src={LogoUrl} alt="Stewardship" />
    </a>
);

export default Logo;