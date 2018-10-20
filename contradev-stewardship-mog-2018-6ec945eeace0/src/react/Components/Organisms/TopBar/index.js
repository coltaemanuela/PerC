import React from 'react';
import PropTypes from 'prop-types';
import TopNav from './TopNav';
import TopAmount from './TopAmount';
import User from './User';
import Logo from '../../Atoms/Logo';
import Burger from '../../Atoms/Burger';


const TopBar = ({ topUpAmount, balanceAmount, giftAmount, className, ...userProps }) => (

    <header className={className}>
        <div className="topbar-left">
            <Logo />
            <TopNav />
        </div>
        <div className="topbar-right">
            <TopAmount topUpAmount={topUpAmount} balanceAmount={balanceAmount} giftAmount={giftAmount} />
            <User {...userProps} />
            <Burger />
        </div>
    </header>

);

TopAmount.propTypes = {
  topUpAmount: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
  balanceAmount: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
  giftAmount: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ])
};

TopAmount.defaultProps = {
  topUpAmount: 0,
  balanceAmount: 0,
  giftAmount: 0,
  className: ''
};

export default TopBar;