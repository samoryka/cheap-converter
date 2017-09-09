import React, { Component } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

const themeColors = require('../resources/themeColors.json');

const UnitPickerContainer = styled.div`
width:50%;
float:left;
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
        <label htmlFor={this.props.valueType}>{this.props.valueType.toUpperCase()}</label>
        <input  
          id = {this.props.valueType}
          type = "number"
          min = {0}
          value = {this.props.value}
          onInput={evt => this.updateInputValue(evt)} />
          <span>
                {this.state.selectedUnit.value.symbol}
          </span>
        <Select 
          name="unit"
          value = {this.state.selectedUnit}
          options = {this.state.unitOptions}
          onChange = {selectedValue => this.changeUnit(selectedValue)}
          clearable = {false} />
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
}

  export default UnitPicker;