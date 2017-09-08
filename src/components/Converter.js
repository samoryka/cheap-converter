import React, { Component } from 'react';
import UnitPicker from './UnitPicker';

class Converter extends Component {
  constructor() {
    super();
    this.state = {
      fluid: 'water',
      massValue: 1,
      volumeValue: 0,
      massUnits: require('../resources/massUnits.json').units,
      massUnit:'g',
      volumeUnits: require('../resources/volumeUnits.json').units,
      volumeUnit: 'L',
      massToVolumeCoefficient:0.001,
    }
  }

  componentWillMount() {
    this.setState({
      volumeValue: convertValue(this.state.massValue, 'mass', this.state.massToVolumeCoefficient),
      massUnit:this.state.massUnits[0],
      volumeUnit:this.state.volumeUnits[0]
    });
  }

  handleVolumeChanged(value) {
    this.setState({
      volumeValue: value,
      massValue: convertValue(value, 'volume', this.state.massToVolumeCoefficient)
    });
  }

  handleMassChanged(value) {
    this.setState({
      massValue: value,
      volumeValue: convertValue(value, 'mass', this.state.massToVolumeCoefficient)
    });
  }

  handleVolumeUnitChanged(value) {
    let newCoefficient = this.computeMassToVolumeCoefficient(this.state.massUnit.coefficientToGram, value.coefficientToLiter, 1);
    this.setState({
      volumeUnit: value,
      massToVolumeCoefficient:newCoefficient,
      massValue: convertValue(this.state.volumeValue, 'volume', newCoefficient)
    });
  }

  handleMassUnitChanged(value) {
    let newCoefficient = this.computeMassToVolumeCoefficient(value.coefficientToGram, this.state.volumeUnit.coefficientToLiter, 1);
    this.setState({
      massUnit: value,
      massToVolumeCoefficient:newCoefficient,
      volumeValue: convertValue(this.state.massValue, 'mass', newCoefficient)
    });
  }

  computeMassToVolumeCoefficient(coefficientToGram, coefficientToLiter, fluidCoefficient) {
    //TODO: take fluid into account
    return (coefficientToGram / coefficientToLiter) * 0.001;
  }

  render() {
    return (
      <div className = "Converter">
        <UnitPicker
        valueType = 'mass'
        value = {this.state.massValue}
        unit = {this.state.massUnit}
        units = {this.state.massUnits}
        onValueChange = {value => this.handleMassChanged(value)}
        onUnitChange = {value => this.handleMassUnitChanged(value)}/>

        <UnitPicker
        valueType = 'volume'
        value = {this.state.volumeValue}
        unit = {this.state.volumeUnit}
        units = {this.state.volumeUnits}
        onValueChange = {value => this.handleVolumeChanged(value)}
        onUnitChange = {value => this.handleVolumeUnitChanged(value)}/>
      </div>
    );
  }
}

function convertValue(value, valueType, massToVolumeCoefficient) {
  if(typeof(value) !== undefined)
    {
      switch(valueType){
        case 'mass':
          return value * massToVolumeCoefficient;
        case 'volume':
          return value * (1/massToVolumeCoefficient);
        default:
          return value * massToVolumeCoefficient;
      }
    }
  else
    return 0;
}

export default Converter;
