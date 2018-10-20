import React from 'react';
import PropTypes from 'prop-types';

const Bottom = ({ columns, children }) => (
  <div className="bottom">
      <div className={`col-md-${columns}`}>
          {children}
      </div>
  </div>
);

Bottom.propTypes = {
  children: PropTypes.oneOfType([ PropTypes.object, PropTypes.array ]),
};

Bottom.defaultProps = {
  columns: 6,
};

export default Bottom;