import React from 'react';
import Cleave from 'cleave.js/react';
// import FontAwesome from 'react-fontawesome'; // remove from npm
import IconSvg from '../Atoms/IconSvg';
import FormElement from '../Molecules/FormElement';

export default class CreditCard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            cardType: 'creditcard',
            form: {}
        };

        // list all the names of the fields in the form
        this.formFields = [
            'cardName',
            'cardNumber',
            'cardExpiry',
            'cardCvv'
        ];

        // setup a state and default values for each field in the form
        this.formFields.map(field => {
            this.state.form[field] = {
                value: this.props[field] || '',
                touched: false,
                invalid: false
            };
        });

        this.onCreditCardTypeChanged = this.onCreditCardTypeChanged.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputBlur = this.handleInputBlur.bind(this);
    }

    onCreditCardTypeChanged(type) {
        this.setState({
            cardType: type
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const field = target.name;
        this.setState((prevState) => {
            let form = prevState.form;
            form[field].value = value;
            form[field].touched = true;
            form[field].invalid = this.required(form[field]);
            this.props.onChange(form);
            return {form: form};
        });
    }

    handleInputBlur(event) {
        const field = event.target.name;
        this.setState((prevState) => {
            let form = prevState.form;
            form[field].touched = true;
            form[field].invalid = this.required(form[field]);
            return {form: form};
        });
    }

    // Generic validation
    required(field) {
        return field.touched ? field.value.length === 0 : false;
    }

    render() {
        return (
            <div className="border">
                <FormRow>
                    <FormElement name="cardName" label="Card holder name" invalidText=" (required)" className={`${this.state.form.cardName.invalid ? 'form-el-error' : ''}`}>
                        <input name="cardName" type="text" onChange={this.handleInputChange} onBlur={this.handleInputBlur} defaultValue={this.props.cardName || ''}/>
                    </FormElement>
                </FormRow>
                <FormRow>
                    <FormElement name="cardNumber" label="Card number" className={`${this.state.form.cardNumber.invalid ? 'form-el-error' : ''}`}>
                        <IconSvg type={this.state.cardType} className="cc-icon" size={40} overrideDefaultType="creditcard" />
                        <Cleave name="cardNumber" options={{creditCard: true, onCreditCardTypeChanged: this.onCreditCardTypeChanged}} onChange={this.handleInputChange} onBlur={this.handleInputBlur} />
                    </FormElement>
                </FormRow>
                <FormRow>
                    <FormElement name="cardExpiry" label="Expiry" invalidText=" (required)" className={`${this.state.form.cardExpiry.invalid ? 'form-el-error' : ''}`} columns="4">
                        <Cleave name="cardExpiry" options={{date: true, datePattern: ['m', 'y']}} placeholder="MM/YY" onChange={this.handleInputChange} onBlur={this.handleInputBlur} />
                    </FormElement>
                    <FormElement name="cardCvv" label="CVV" invalidText=" (required)" className={`${this.state.form.cardCvv.invalid ? 'form-el-error' : ''}`} columns="4">
                        <Cleave name="cardCvv" options={{numeral: true}} maxLength="3" onChange={this.handleInputChange} onBlur={this.handleInputBlur} />
                    </FormElement>
                </FormRow>
            </div>
        );
    }
}