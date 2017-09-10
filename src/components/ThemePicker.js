import React, { Component } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

const ThemePickerContainer = styled.div`
    margin: 1em 0.5em 1em 0.5em;
    width:10em;
    
    & .Select-menu-outer {
        position: absolute !important;
        top: auto !important;
        bottom: calc(100% - 1px) !important;
        border-bottom-left-radius: 0px !important;
        border-bottom-right-radius: 0px !important;
        border-top-left-radius: 5px !important;
        border-top-right-radius: 5px !important;
    }
    
    & .is-open .Select-control {
        border-top-right-radius: 0 !important;
        border-top-left-radius: 0 !important;
        border-bottom-right-radius: 5px !important;
        border-bottom-left-radius: 5px !important;
    }
`;

const ThemeSelect = styled(Select)`
.Select-control {
    border-color: ${props => props.theme.primary};
    background: transparent;
}
&.is-open > .Select-control{
    background: ${props => props.theme.primaryLight};
}
&.is-focused:not(.is-open) > .Select-control{
    border-color: ${props => props.theme.primary};
    box-shadow: 0 0 0;
}

.Select-value {
    text-align: center;
    font-size: large;
    font-weight: bold;
}

.Select-option {
    text-align: center;
    font-size: large;
}
.Select-option.is-focused {
    background-color: ${props => props.theme.primaryLight};
}

.select-up .Select-menu-outer {
    position: absolute !important;
    top: auto !important;
    bottom: calc(100% - 1px) !important;
    border-bottom-left-radius: 0px !important;
    border-bottom-right-radius: 0px !important;
    border-top-left-radius: 5px !important;
    border-top-right-radius: 5px !important;
}

.select-up .is-open .Select-control {
    border-top-right-radius: 0 !important;
    border-top-left-radius: 0 !important;
    border-bottom-right-radius: 5px !important;
    border-bottom-left-radius: 5px !important;
}
`;


class ThemePicker extends Component {

    constructor(props) {
    super(props)
    // We convert our themes to an array usable by the theme selector
    let themes = props.themes;

    var selectorOptions = []
        for(var i in themes) {
            let theme = themes[i];
            selectorOptions.push({
            value:theme,
            label:theme.name
            });
        }

        this.state = {
            themeOptions: selectorOptions,
            selectedTheme: selectorOptions.filter(option => option.value.name === "red")[0]
        };
    }

    render() {
        return (
            <ThemePickerContainer>
                <ThemeSelect 
                    id = "themePicker"
                    className = "ThemeSelect"
                    name="Theme"
                    value = {this.state.selectedTheme}
                    options = {this.state.themeOptions}
                    onChange = {selectedValue => this.changeTheme(selectedValue)}
                    clearable = {false}
                    searchable = {false}/>
            </ThemePickerContainer>
        );
    }  

    changeTheme(selectedValue) {
    this.props.onThemeChange(selectedValue.value);
    this.setState({
        selectedTheme:selectedValue
    });
    }
}

export default ThemePicker;