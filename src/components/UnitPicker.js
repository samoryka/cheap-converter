import React, { Component } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

const UnitPickerContainer = styled.div`
flex: 1 1 auto;
margin:0.5em;
box-sizing: border-box;
max-width: 40%;
`;

const Card = styled.div`
border-radius: 5px;
border-color: ${props => props.theme.primary};
border-style: solid;
border-width: thin;

display:flex;
flex-flow: column wrap;
justify-content: center;
align-items: flex-end;
`;

const ValueLabel = styled.h1`
background: ${props => props.theme.primary};
text-align: center;
font-size: small;
align-self: stretch;
margin:0;
padding: 0.5em 1em 0.5em 1em;
flex: 0 1 auto;
`;

const ValueContainer = styled.div`
display:flex;
flex-flow: row;
flex: 0 1 auto;
justify-content: flex-start;
align-items: center;
padding: 0.5em 0.1em 0.5em 0.5em;
`;

const ValueInput = styled.input`
align-self: flex-start;
width: 60%;
font-size: xx-large;
background: transparent;
text-align: right;
outline-style:none;
border: none;
border-bottom: thin dotted;
border-color: ${props => props.theme.primary};

&:focus {
border-bottom: thin solid;
border-color: ${props => props.theme.primaryDark};
}
`;

const ValueUnit = styled.span`
font-size: x-large;
`;

const UnitSelect = styled(Select)`
align-self: stretch;
.Select-control {
  border: none;
  background: transparent;
}
&.is-open > .Select-control{
  border-radius: 0;
  background: ${props => props.theme.primary};
}
&.is-focused:not(.is-open) > .Select-control{
  border:none;
  box-shadow: 0 0 0;
}

.Select-value {
  text-align: center;
  font-size: medium;
  font-weight: bold;
}

.Select-option {
  text-align: center;
  font-size: large;
}
.Select-option.is-focused {
  background-color: ${props => props.theme.primaryLight};
}
`;

class UnitPicker extends Component {

  constructor(props) {
    super(props)
    // We convert our units to an array usable by the unit selector
    let units = props.units;

    var selectorOptions = []
    for(var i in units) {
      let unit = units[i];
      selectorOptions.push({
        value:unit,
        label:unit.name + '(' + unit.symbol + ')'
      });
    }

    this.state = {
      unitOptions: selectorOptions,
      selectedUnit: selectorOptions[0]
    };
  }

  render() {
    return (
      <UnitPickerContainer>
        <Card>
          <ValueLabel htmlFor={this.props.valueType}>{this.props.valueType.toUpperCase()}</ValueLabel>
          <ValueContainer>
            <ValueInput  
              id = {this.props.valueType}
              type = "number"
              min = {0}
              value = {this.props.value}
              onInput={evt => this.updateInputValue(evt)} />
              <ValueUnit> {this.getSymbol()} </ValueUnit>
          </ValueContainer>
          <UnitSelect 
            className = "UnitSelect"
            name="unit"
            value = {this.state.selectedUnit}
            options = {this.state.unitOptions}
            onChange = {selectedValue => this.changeUnit(selectedValue)}
            clearable = {false} />
          </Card>
      </UnitPickerContainer>
    );
  }  

  updateInputValue(evt) {
    this.props.onValueChange(evt.target.value);
  }

  changeUnit(selectedValue) {
      this.props.onUnitChange(selectedValue.value);
      this.setState({
        selectedUnit:selectedValue
    });
  }

  getSymbol() {
    if (this.state.selectedUnit.value !== undefined)
      return this.state.selectedUnit.value.symbol;
  }
}

  export default UnitPicker;