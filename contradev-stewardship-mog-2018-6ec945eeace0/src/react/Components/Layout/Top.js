import React from 'react';
import PropTypes from 'prop-types';

const Top = ({ title, children }) => (
  <div className="top">
    <div>
      <h1>{title}</h1>
      {children}
    </div>
  </div>
);

Top.propTypes = {
  title: PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]).isRequired,
  children: PropTypes.oneOfType([ PropTypes.object, PropTypes.array ]),
};

export default Top;