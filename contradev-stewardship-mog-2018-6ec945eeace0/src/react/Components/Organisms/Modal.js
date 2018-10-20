import React from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const Modal = (props) => {
    const noBubble = e => {
        e.stopPropagation();
    };
    return (
        <React.Fragment>
            <ReactCSSTransitionGroup transitionName='fade' transitionEnterTimeout={500} transitionLeaveTimeout={500}>
            { props.isOpen &&
                <div className="overlay overlay-visible" onClick={props.closeHandler}>
                    <button className="close-overlay"><i className="ion-ios-close-empty"></i></button>
                    <div className={`overlay-content${props.white ? ' overlay-content-white' : ''}`} onClick={noBubble}>
                        <h2 className="h1">{props.title}</h2>
                        {props.children}
                    </div>
                </div>
            }
            </ReactCSSTransitionGroup>
        </React.Fragment>
    );
};

Modal.propTypes = {
    title: PropTypes.string.isRequired,
    white: PropTypes.bool,
    closeHandler: PropTypes.func,
    className: PropTypes.string
  };

Modal.defaultProps = {
    white: false,
    className: ''
};

export default Modal;