import React from 'react';
import PropTypes from 'prop-types';
import UserPopUp from './UserPopUp';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


export default class User extends React.Component {

    static propTypes = {
        notifications: PropTypes.array,
        userInitials: PropTypes.string.isRequired
    }

    static defaultProps = {
        notifications: []
    }

    constructor(props) {
        super(props);

        this.state = {
            open: false,
            notifications: this.props.notifications || [],
        }
    }

    componentDidMount() {
        setTimeout(function() {
            // document.body.classList.toggle('ready');
        }, 1);
    }

    toggleUserPopUp = (event) => {
        this.setState({ open: !this.state.open });
        // this.addNotification('test', new Date());
    }

    addNotification = (message, date) => {
        const notification = {
            message: message,
            date: date || new Date()
        };
        this.setState(previousState => ({
            notifications: [...previousState.notifications, notification]
        }));
    }

    removeNotification = (id) => {
        console.log(id);
        this.setState(previousState => ({
            notifications: previousState.notifications.filter((n) => n.id !== id)
        }));
    }

    render() {
        const {userInitials, ...popUpProps} = this.props;
        const badge = this.state.notifications.length ? {'data-count': this.state.notifications.length} : {};

        return (
            <div className="user-box">
                <button className="user" {...badge} onClick={this.toggleUserPopUp}>
                    <span className="user-name">{userInitials}</span>
                </button>
                <ReactCSSTransitionGroup transitionName='fade' transitionEnterTimeout={500} transitionLeaveTimeout={500}>
                    { this.state.open &&
                        <UserPopUp {...popUpProps} notifications={this.state.notifications} removeNotification={this.removeNotification} />
                    }
                </ReactCSSTransitionGroup>
            </div>
        );
    }

}