import React, { Component } from 'react';
import UnitPicker from './UnitPicker';
import FluidPicker from './FluidPicker';

class Converter extends Component {
  constructor() {
    super();
    this.state = {
      massValue: 1,
      volumeValue: 0,
      massUnits: require('../resources/massUnits.json').units,
      massUnit:'g',
      volumeUnits: require('../resources/volumeUnits.json').units,
      volumeUnit: 'L',
      fluids: require('../resources/fluids.json').fluids,
      fluid: 'water',
      massToVolumeCoefficient:0.001,
    }
  }

  componentWillMount() {
    this.setState({
      volumeValue: convertValue(this.state.massValue, 'mass', this.state.massToVolumeCoefficient),
      massUnit: this.state.massUnits[0],
      volumeUnit: this.state.volumeUnits[0],
      fluid: this.state.fluids[0],
      massToVolumeCoefficient: computeMassToVolumeCoefficient(this.state.massUnits[0].coefficientToGram,
        this.state.volumeUnits[0].coefficientToLiter,
        this.state.fluids[0].gramToLiterCoefficient)
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
    let newCoefficient = computeMassToVolumeCoefficient(this.state.massUnit.coefficientToGram, value.coefficientToLiter, this.state.fluid.gramToLiterCoefficient);
    this.setState({
      volumeUnit: value,
      massToVolumeCoefficient:newCoefficient,
      massValue: convertValue(this.state.volumeValue, 'volume', newCoefficient)
    });
  }

  handleMassUnitChanged(value) {
    let newCoefficient = computeMassToVolumeCoefficient(value.coefficientToGram, this.state.volumeUnit.coefficientToLiter, this.state.fluid.gramToLiterCoefficient);
    this.setState({
      massUnit: value,
      massToVolumeCoefficient:newCoefficient,
      volumeValue: convertValue(this.state.massValue, 'mass', newCoefficient)
    });
  }

  handleFluidChanged(value) {
    let newCoefficient = computeMassToVolumeCoefficient(this.state.massUnit.coefficientToGram, this.state.volumeUnit.coefficientToLiter, value.gramToLiterCoefficient);
    this.setState({
      fluid: value,
      massToVolumeCoefficient: newCoefficient,
      volumeValue: convertValue(this.state.massValue, 'mass', newCoefficient)
    });
  }

  render() {
    return (
      <div className = "Converter">
        <FluidPicker
        fluids = {this.state.fluids}
        onFluidChange = {value => this.handleFluidChanged(value)}
        />
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

function computeMassToVolumeCoefficient(coefficientToGram, coefficientToLiter, fluidCoefficient) {
  return (coefficientToGram / coefficientToLiter) * fluidCoefficient;
}

function convertValue(value, valueType, massToVolumeCoefficient) {
  if(typeof(value) !== undefined)
    {
      switch(valueType){
        case 'mass':
          return +(value * massToVolumeCoefficient).toFixed(2);
        case 'volume':
          return +(value * (1/massToVolumeCoefficient)).toFixed(2);
        default:
          return +(value * massToVolumeCoefficient).toFixed(2);
      }
    }
  else
    return 0;
}

export default Converter;
