import React from 'react';
import PropTypes from 'prop-types';
import NumeralFormatter from 'cleave.js/src/shortcuts/NumeralFormatter.js';

const Money = ({ elementType, children }) => {

  const numeralFormatter = new NumeralFormatter();
  const El = `${elementType}`;

  const formatMoney = (val) => {
    return numeralFormatter.format(String(val));
  }

  return (
    <El className="money">{formatMoney(children)}</El>
  )
};

Money.propTypes = {
  elementType: PropTypes.oneOf(['span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'small']),
  children: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
};

Money.defaultProps = {
  elementType: 'span'
};

export default Money;
