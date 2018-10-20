import React from 'react';
import PropTypes from 'prop-types';
import Flickity from './FlickityComponent';
import Money from '../Atoms/Money';

export default class Bubbles extends React.Component {

    constructor(props) {
        super(props);

        this.onReadyHandler = this.onReadyHandler.bind(this);
        this.flkty = null;
    }

    componentDidMount() {
        // this.flkty.on('settle', () => {
        //     console.log(`current index is ${this.flkty.selectedIndex}`)
        // });

        // Not nice, but the initialIndex option is being ignored for some reason.
        // setTimeout(() => {
        //     // this.flkty.select( 1, false, true );
        //     // console.log(this.flkty.slides());
        // }, 100);
    }

    onReadyHandler(f) {
        console.log(f);
        // this.flkty.select( 1, false, true );
        // f.select( 1, false, true );
    }

    render() {
        const {topUpAmount, topUpBoostedAmount, balanceAmount, balanceUnclearedAmount, giftAmount, giftCharityCount, className, ...other} = this.props;
        return (
            <div className={`bubble-slider ${className}`}>
                <div className="bubble-slider-item">
                    <h2 className="h3">Monthly top-ups</h2>
                    <div className="bubble-slider-amount"><Money>{topUpAmount}</Money></div>
                    <span>Boosted to <Money>{topUpBoostedAmount}</Money></span>
                </div>
                <div className="bubble-slider-item">
                    <h2 className="h3">Available balance</h2>
                    <div className="bubble-slider-amount"><Money>{balanceAmount}</Money></div>
                    <span>Uncleared: <Money>{balanceUnclearedAmount}</Money></span>
                </div>
                <div className="bubble-slider-item">
                    <h2 className="h3">Regular gifts</h2>
                    <div className="bubble-slider-amount"><Money>{giftAmount}</Money></div>
                    <span>To {giftCharityCount} recipients</span>
                </div>
            </div>
        );
    }
}

