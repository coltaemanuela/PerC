import React from 'react';
import PropTypes from 'prop-types';
import Money from '../../Atoms/Money';

const TopAmount = ({ topUpAmount, balanceAmount, giftAmount}) => (

    <div className="amount">
        <a className="amount-item" href="#">
            <small>Monthly top-ups</small>
            <p><Money>{topUpAmount}</Money></p>
        </a>
        <a className="amount-item amount-balance" href="#">
            <small>Balance</small>
            <p><Money>{balanceAmount}</Money></p>
        </a>
        <a className="amount-item" href="#">
            <small>Regular gifts</small>
            <p><Money>{giftAmount}</Money></p>
        </a>
    </div>

);

TopAmount.propTypes = {
  topUpAmount: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
  balanceAmount: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
  giftAmount: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
};

TopAmount.defaultProps = {
  topUpAmount: 0,
  balanceAmount: 0,
  giftAmount: 0,
};

export default TopAmount;
