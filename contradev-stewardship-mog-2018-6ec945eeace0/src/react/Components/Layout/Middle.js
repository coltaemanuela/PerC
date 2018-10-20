import React from 'react';
import PropTypes from 'prop-types';

const Middle = ({ columns, top, className, children, ...props }) => {

  return (
    <div className={`middle ${top && 'align-top'} ${className}`} {...props}>
        <div className={`col-md-${columns}`}>
          {children}
        </div>
    </div>
  );
};

Middle.propTypes = {
  columns: PropTypes.string,
  top: PropTypes.bool,
  children: PropTypes.oneOfType([ PropTypes.object, PropTypes.array ]),
};

Middle.defaultProps = {
  columns: "6",
  top: false,
  className: ''
};

export default Middle;