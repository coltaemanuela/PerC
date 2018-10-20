import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-icon-base'
import TopUpIcon from 'react-icons/lib/fa/heart';
import Right from 'react-icons/lib/fa/chevron-right';
import CreditCard from 'react-icons/lib/fa/credit-card';
import Visa from 'react-icons/lib/fa/cc-visa';
import Amex from 'react-icons/lib/fa/cc-amex';
import MasterCard from 'react-icons/lib/fa/cc-mastercard';

const GiftIcon = props => (
    <Icon viewBox="0 0 40 40" {...props}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M275.3 250.5c7 7.4 18.4 7.4 25.5 0l108.9-114.2c31.6-33.2 29.8-88.2-5.6-118.8-30.8-26.7-76.7-21.9-104.9 7.7L288 36.9l-11.1-11.6C248.7-4.4 202.8-9.2 172 17.5c-35.3 30.6-37.2 85.6-5.6 118.8l108.9 114.2zm290 77.6c-11.8-10.7-30.2-10-42.6 0L430.3 402c-11.3 9.1-25.4 14-40 14H272c-8.8 0-16-7.2-16-16s7.2-16 16-16h78.3c15.9 0 30.7-10.9 33.3-26.6 3.3-20-12.1-37.4-31.6-37.4H192c-27 0-53.1 9.3-74.1 26.3L71.4 384H16c-8.8 0-16 7.2-16 16v96c0 8.8 7.2 16 16 16h356.8c14.5 0 28.6-4.9 40-14L564 377c15.2-12.1 16.4-35.3 1.3-48.9z"/></svg>
    </Icon>
)

const validTypes = {
    'right': Right,
    'gift' : GiftIcon,
    'top-up' : TopUpIcon,
    'visa' : Visa,
    'amex' : Amex,
    'mastercard' : MasterCard,
    'creditcard' : CreditCard
}


const IconSvg = ({type, size, overrideDefaultType, ...props}) => {

    let Icon;

    if (type == 'unknown' || type == 'undefined' || !(type in validTypes) ) {
        Icon = (overrideDefaultType in validTypes) ? validTypes[overrideDefaultType] : Right
    } else {
        Icon = validTypes[type];
    }

    return (
        <Icon size={size} {...props} />
    );

};



IconSvg.propTypes = {
    type: PropTypes.string,
    size: PropTypes.number,
    overrideDefaultType: PropTypes.string
};

IconSvg.defaultProps = {
    size: 20
}

export default IconSvg;