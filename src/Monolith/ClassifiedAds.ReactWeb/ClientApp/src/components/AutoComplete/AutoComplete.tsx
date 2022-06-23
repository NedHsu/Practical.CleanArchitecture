
import styles from "./AutoComplete.module.scss";
import React, { Component, Fragment } from 'react'

export default class AutoComplete extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: props.text,
      currentValue: props.value,
    };
  }

  setItems(filteredSuggestions) {
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
    });
  }

  onChange = e => {
    const { suggestions, loadData } = this.props;
    const userInput = e.currentTarget.value;
    const self = this;

    if (loadData) {
      self.setState({
        showSuggestions: true,
        userInput: userInput
      });
      loadData(userInput);
    } else {
      let filteredSuggestions = suggestions.filter(
        suggestion =>
          suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
      );
      self.setState({
        activeSuggestion: 0,
        filteredSuggestions,
        showSuggestions: true,
        userInput: userInput,
      });
    }
  };

  setValue = suggestion => {
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: suggestion.text,
      currentValue: suggestion.value,
    });
    if (this.props.onValueChange) {
      this.props.onValueChange(suggestion);
    }
  };

  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    if (e.keyCode === 13) {
      this.setValue(filteredSuggestions[activeSuggestion]);
    } else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }
      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow, increment the index
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }
      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  render() {
    const {
      onChange,
      setValue,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput,
        currentValue,
      },
      props: {
        name: inputName,
        disabled,
        className: propClassName,
      },
    } = this;

    let suggestionsListComponent;

    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul className={styles.suggestions}>
            {filteredSuggestions.map((suggestion, index) => {
              let className;

              // Flag the active suggestion with a class
              if (index === activeSuggestion) {
                className = styles.suggestionActive;
              }
              return (
                <li className={className} key={`suggestion-${index}`} onClick={() => { setValue(suggestion); }}>
                  {suggestion.text}
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <div className={styles.noSuggestions}>
            <em>No suggestions available.</em>
          </div>
        );
      }
    }

    return (
      <Fragment>
        <input
          type="text"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={userInput}
          className={propClassName}
          disabled={disabled}
        />
        <input
          type="hidden"
          name={inputName}
          value={currentValue}
        />
        {suggestionsListComponent}
      </Fragment>
    )
  }
}