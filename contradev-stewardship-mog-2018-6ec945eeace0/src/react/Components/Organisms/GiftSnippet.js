import React from 'react';
import PropTypes from 'prop-types';
import Money from '../Atoms/Money';

export default class GiftSnippet extends React.Component {

    static propTypes = {
        reference: PropTypes.string,
        anonymous: PropTypes.bool,
        amount: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]).isRequired,
        giftAidAmount: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]).isRequired,
        giftAid: PropTypes.bool
    }

    static defaultProps = {
        reference: '',
        anonymous: false,
        giftAid: false,
        giftAidAmount: 0
    }

    constructor(props) {
        super(props);
        this.state = {
            reference: props.reference,
            anonymous: props.anonymous
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState((prev) => {
            var state = prev;
            state[name] = value;
            if (this.props.onChange) {
                this.props.onChange(state);
            }
            return(state);
        });
    }

    render() {
        const { name, amount, giftAid, giftAidAmount } = this.props;
        const safeName = this.state.anonymous ? "Anonymous gift" : name;

        return (
            <div className="card-stat">
                <div className="card-stat-you">
                    <span className="card-stat-you-name">{safeName}</span> <Money>{amount}</Money>
                </div>
                { giftAid==true &&
                    <div className="card-stat-gift">
                        <span>Boosted by</span> <Money>{giftAidAmount}</Money>
                    </div>
                }
                <div className="card-stat-message">
                    <textarea name="reference" placeholder="Enter a reference here if you wish" onChange={this.handleInputChange} />
                </div>
                <Toggle checked={this.props.anonymous} label="Hide my name and make anonymous" id="anonymous" onChange={this.handleInputChange} />
            </div>
        );
    }
}