import React from 'react';
import Autosuggest from 'react-autosuggest';
import CharityListItem from '../Molecules/CharityListItem';

const getSuggestionValue = suggestion => suggestion.charityName;

const renderSuggestion = suggestion => (
    <CharityListItem
        key={suggestion.charityId}
        charityName={suggestion.charityName}
        charityUrl={suggestion.charityUrl}
        charityNumber={suggestion.charityNumber}
        charityId={suggestion.charityId}
        favourited={suggestion.favourited}
    />
);

export default class CharitySearch extends React.Component {
constructor() {
    super();

    this.state = {
        value: '',
        suggestions: []
    };
}

getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : this.props.charities.filter(charity =>
        charity.charityName.toLowerCase().slice(0, inputLength) === inputValue
    );
};

onChange = (event, { newValue}) => {
    this.setState({
        value: newValue
    });
    if (this.props.onChange) {
        this.props.onChange(newValue);
    }
};

onBlur = (event) => {
    if (this.props.onChange) {
        this.props.onBlur(event);
    }
};

onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
        suggestions: this.getSuggestions(value)
    });
};

onSuggestionsClearRequested = () => {
    this.setState({
        suggestions: []
    });
};

render() {
    const { value, suggestions } = this.state;

    const inputProps = {
        placeholder: 'Search for a charity',
        value,
        onChange: this.onChange,
        onBlur: this.onBlur
    };

    return (
        <div className={`charity-search-box${this.state.value.length > 0 ? ' focused' : ''}`}>
            <div className={`input${this.state.value.length > 0 ? ' focused' : ''}`}>
                <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    onSuggestionSelected={this.props.onSuggestionSelected}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    inputProps={inputProps}
                />
            </div>
        </div>
        );
    }
}