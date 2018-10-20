import React from 'react';
import PropTypes from 'prop-types';

const ButtonGroup = ({ horizontal, className, children, ...props }) => {
  return (
    <div className={`buttons-group${horizontal ? '' : ' buttons-group-col'} ${className}`}>
      {children}
    </div>
  )
}

ButtonGroup.propTypes = {
  horizontal: PropTypes.bool,
  children: PropTypes.oneOfType([ PropTypes.object, PropTypes.array ]),
};

ButtonGroup.defaultProps = {
  horizontal: false,
  className: ''
};

export default ButtonGroup;