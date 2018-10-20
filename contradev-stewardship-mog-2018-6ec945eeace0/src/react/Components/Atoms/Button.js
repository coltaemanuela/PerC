import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ small, full, type, elementType, className, children, ...props }) => {
  const El = `${elementType}`;
  return (
    <El className={`btn${small ? ' btn-small ' : ' '}btn-${type}${full ? ' btn-full ' : ' '}${className}`} {...props}>{children}</El>
  );
};

Button.propTypes = {
  small: PropTypes.bool,
  full: PropTypes.bool,
  type: PropTypes.string,
  elementType: PropTypes.oneOf(['a', 'button']),
  children: PropTypes.oneOfType([ PropTypes.object, PropTypes.array, PropTypes.string ]).isRequired,
};

Button.defaultProps = {
  small: false,
  full: true,
  type: 'white',
  elementType: 'a',
  className: ''
};

export default Button;