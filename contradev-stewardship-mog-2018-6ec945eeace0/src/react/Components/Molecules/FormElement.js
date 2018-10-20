import React from 'react';
import PropTypes from 'prop-types';

const FormElement = ({ label, invalidText, type, name, columns, className, children, ...props}) => {
    return (
        <div className={`col-md-${columns}`}>
            <div className={`form-el ${className}`}>
                <label htmlFor={name} data-invalid={invalidText}>{label}</label>
                <div className="input">
                    {children}
                </div>
            </div>
        </div>
    );
};

FormElement.propTypes = {
    label: PropTypes.string.isRequired,
    invalidText: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    columns: PropTypes.string,
    children: PropTypes.oneOfType([ PropTypes.object, PropTypes.array ]).isRequired,
  };

FormElement.defaultProps = {
    type: 'input',
    columns: '12',
    className: '',
    invalidText: 'The input is not valid.'
};

export default FormElement;