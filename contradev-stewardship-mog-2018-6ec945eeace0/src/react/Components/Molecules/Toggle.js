import React from 'react';
import PropTypes from 'prop-types';

class Toggle extends React.Component {

    static propTypes = {
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);

        this.state = ({
            checked: props.checked,
        });

        this.handleInputChange = this.handleInputChange.bind(this);

        // This helps the toggle appear to be a checkbox
        this.target = {
                type: "checkbox",
                name: props.id,
                checked: this.state.checked
            };
    }

    handleInputChange = () => {
        const checkedVal = !this.state.checked;
        this.setState({ checked: checkedVal });
        this.target.checked = checkedVal;
        if (this.props.onChange) {
            this.props.onChange(this);
        }
    }

    render() {
        return (
            <div className="toggle-and-label">
                <label htmlFor={this.props.id}>{this.props.label}</label>
                <div className="toggle-and-checkbox">
                    <input type="checkbox" id={this.props.id} value={this.props.label} checked={this.state.checked} onChange={this.handleInputChange} />
                    <div className="toggle">
                        <div className="toggle-ball"></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Toggle;