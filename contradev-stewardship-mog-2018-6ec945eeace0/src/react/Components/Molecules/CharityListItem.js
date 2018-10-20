import React from 'react';

const CharityListItem = ({ charityName, charityUrl, charityNumber, charityId, favourited, removeCharity, ...props }) => {
    return (
        <React.Fragment>
            <div className="charity-name">{charityName}
                <a href="#" onClick={() => removeCharity(charityId)} className="remove-from-fav" title="Remove from favorites"><i className={`ion-ios-heart${favourited ? '': '-outline'}`}></i></a>
            </div>
            <div><a href="#" alt="">{charityUrl}</a>
                <span># {charityNumber}</span>
            </div>
        </React.Fragment>
    );
};

export default CharityListItem;