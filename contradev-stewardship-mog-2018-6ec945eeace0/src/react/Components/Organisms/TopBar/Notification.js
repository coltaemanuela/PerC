import React from 'react';
import Moment from 'react-moment'; 

const Notification = ({message, date, id, removeNotification}) => (
    <li >{message} <Moment fromNow>{date}</Moment> <a href="#" onClick={() => removeNotification(id)} className="delete-not" title="Delete notification">Got it <i className="ion-ios-close-empty"></i></a></li>
);

export default Notification;