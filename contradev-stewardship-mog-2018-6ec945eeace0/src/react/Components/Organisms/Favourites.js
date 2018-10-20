import React from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import CharityListItem from '../Molecules/CharityListItem';

const Favourites = ({ favourites, removeCharity, className, ...props }) => {
    return (
        <React.Fragment>
        { favourites.length > 0 &&
        <div className={'charity-fav ' + className}>
            <h2 className="charity-fav-title">Your favourite charities</h2>
            <ul className="charity-fav-list">
            <ReactCSSTransitionGroup transitionName='fade' transitionEnterTimeout={500} transitionLeaveTimeout={500}>
                {favourites.map((fav) =>
                    <li key={fav.charityId}>
                        <CharityListItem
                            charityName={fav.charityName}
                            charityUrl={fav.charityUrl}
                            charityNumber={fav.charityNumber}
                            charityId={fav.charityId}
                            favourited={fav.favourited}
                            removeCharity={removeCharity.bind(this)}
                        />
                    </li>
                )}
            </ReactCSSTransitionGroup>
            </ul>
        </div>
        }
        </React.Fragment>
    );
};

Favourites.propTypes = {
    favourites: PropTypes.array,
    className: PropTypes.string
  };

Favourites.defaultProps = {
    favourites: [],
    className: ''
};

export default Favourites;