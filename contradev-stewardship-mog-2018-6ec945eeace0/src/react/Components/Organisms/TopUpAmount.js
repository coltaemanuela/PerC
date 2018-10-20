import React from 'react';
import PropTypes from 'prop-types';
import Money from '../Atoms/Money';
import Cleave from 'cleave.js/react';

export default class TopUpAmount extends React.Component {

    static propTypes = {
        giftAid: PropTypes.bool,
        feePercentage: PropTypes.number
    };

    static defaultProps = {
        giftAid: false,
        feePercentage: 3
    };

    constructor(props) {
        super(props);

        this.state = {
            amount: 0,
            giftAidAmount: 0
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {

        const value = Number(event.target.rawValue);

        const state = {
            amount: value,
            calculatedAmount: this.props.giftAid ? value * 1.25 - value / 100 * this.props.feePercentage : value - (value / 100 * this.props.feePercentage)
        };

        this.setState(state);
        this.props.onChange(state);
    }

    render() {
        return (
            <div className="top-up">
                <div className="top-up-circle">
                    <div className="top-up-amount">
                        <div className={`top-up-amount-input-box ${this.state.amount > 0 ? 'focused' : ''}`}>
                            <Cleave 
                                className="top-up-input"
                                options={{numeral: true, numeralThousandsGroupStyle: 'thousand'}}
                                onChange={this.handleInputChange} />
                        </div>
                    </div>
                    <div className={`top-up-info ${this.state.amount > 0 ? 'top-up-info-visible' : ''}`}>
                        {
                            this.props.giftAid &&
                            <span className="top-up-info-converted">
                                Boosted to: <Money>{this.state.calculatedAmount}</Money>
                                <span className="top-up-info-converted-info" data-info={`We will boost your top-up to £${this.state.calculatedAmount} by claiming 25% GiftAid less our 3% administration fee`}>i</span>
                            </span>
                        }
                        {
                            !this.props.giftAid &&
                            <span className="top-up-info-converted">
                                After admin fee: <Money>{this.state.calculatedAmount}</Money>
                                <span className="top-up-info-converted-info" data-info={`We hold back ${this.props.feePercentage}% to pay our bills. We’re a charity too, so there are no profits at the end of the year. Anything left goes straight back into supporting our charitable activities.`}>i</span>
                            </span>
                        }
                    </div>
                </div>
            </div>
        );
    }
}
