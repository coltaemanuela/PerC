import React from 'react';

const FormRow = ({className, children, ...props}) => {
    return (
        <div className={`form-row ${className}`} {...props}>
            {children}
        </div>
    );
};

export default FormRow;