import React from 'react';
import PropTypes from 'prop-types';

import Notification from './Notification';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


const UserPopUp = (props) => {
    return (
        <nav className="user-nav">
            <h3 className="user-nav-title truncate">{props.userFullName}</h3>
            <span className="user-nav-account-no">{props.userAccountType} Account No. {props.userAccountNumber}</span>
            <ul className="user-nav-action">
                <li><a href="#"><i className="ion-ios-person"></i> Profile and Settings</a></li>
                {
                    props.userAccountList.length > 1 &&
                    <li><a href="#"><i className="ion-arrow-swap"></i> Switch accounts</a></li>
                }
                <li><a href="#"><i className="ion-log-out"></i> Sign out</a></li>
            </ul>
            {
                props.notifications.length > 0 &&
                <ul className="notifications">
                <ReactCSSTransitionGroup transitionName='fade' transitionEnterTimeout={500} transitionLeaveTimeout={500}>
                    {props.notifications.map((n) => 
                        <Notification 
                            key={n.id} 
                            message={n.message} 
                            date={n.date.toString()} 
                            id={n.id} 
                            removeNotification={props.removeNotification.bind(this)} 
                        />
                    )}
                </ReactCSSTransitionGroup>
                </ul>
            }
        </nav>
    );
};

export default UserPopUp;
