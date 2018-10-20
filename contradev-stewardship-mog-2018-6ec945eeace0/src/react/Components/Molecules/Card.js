import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ title, subtitle, imageUrl, colour, columns, background, children, ...props } ) => {

    let CoreCard = (
        <div className={`card card-${colour}${background ? ' card-bg-img ' : ''}`} {...props} style={{ backgroundImage: background ? `url(${imageUrl})` : null }} >

            { imageUrl && !background &&
            <div className="card-img">
                <img src={imageUrl} alt={title} />
            </div>
            }

            <div className="card-content">
                <h2 className="sup-title">{subtitle}</h2>
                <h3 className="card-title">{title}</h3>
                <div>{children}</div>
            </div>
        </div>
    );

    if (columns) {
        CoreCard = (
            <div className={`col-lg-${columns} col-md-6`}>
                {CoreCard}
            </div>
        )
    }

    return (
        <React.Fragment>
            {CoreCard}
        </React.Fragment>
    );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  colour: PropTypes.string,
  children: PropTypes.oneOfType([ PropTypes.object, PropTypes.array ]).isRequired,
  background: PropTypes.bool
};


Card.defaultProps = {
    background: false,
    colour: 'white'
};

export default Card;