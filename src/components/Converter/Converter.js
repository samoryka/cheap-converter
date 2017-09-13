import React, { Component } from 'react';
import styled from 'styled-components';
import CSSTransition from 'react-transition-group/CSSTransition';

import UnitPicker from './UnitPicker';
import FluidPicker from './FluidPicker';

const massUnits = require('../../resources/data/massUnits.json').units;
const volumeUnits = require('../../resources/data/volumeUnits.json').units;
const fluids = require('../../resources/data/fluids.json').fluids;


const UnitPickersAligner = styled.div`
margin: 1em 0 1em 0;
width:100%;
display:flex;
flex-flow: row wrap;
justify-content: space-between;
align-items: center;
`;



class Converter extends Component {

  constructor(props) {
    super(props);
    this.state = { show: false };
  }
  componentWillMount() {

    let computedMassToValueCoefficient = computeMassToVolumeCoefficient(massUnits[0].coefficientToGram,
      volumeUnits[0].coefficientToLiter,
      fluids[0].gramToLiterCoefficient);

    let computedVolume = convertValue(1, 'mass', computedMassToValueCoefficient);

    this.state = {
      massValue: 1,
      massUnit:massUnits[0],
      volumeUnit: volumeUnits[0],
      fluid: fluids[0],
      volumeValue: computedVolume,
      massToVolumeCoefficient: computedMassToValueCoefficient
    };
  }

  componentDidMount() {
    this.setState({ show: true });
  }

  componentWillUnmount() {
    this.setState({ show: false });
  }

  handleVolumeChanged(value) {
    if(value !== undefined) {
      this.setState({
        volumeValue: value,
        massValue: convertValue(value, 'volume', this.state.massToVolumeCoefficient)
      });
    }
  }

  handleMassChanged(value) {
    if(value !== undefined) {
      this.setState({
        massValue: value,
        volumeValue: convertValue(value, 'mass', this.state.massToVolumeCoefficient)
      });
    }
  }

  handleVolumeUnitChanged(value) {
    if(value !== undefined) {
      let newCoefficient = computeMassToVolumeCoefficient(this.state.massUnit.coefficientToGram, value.coefficientToLiter, this.state.fluid.gramToLiterCoefficient);
      this.setState({
        volumeUnit: value,
        massToVolumeCoefficient:newCoefficient,
        massValue: convertValue(this.state.volumeValue, 'volume', newCoefficient)
      });
    }
  }

  handleMassUnitChanged(value) {
    if(value !== undefined) {
      let newCoefficient = computeMassToVolumeCoefficient(value.coefficientToGram, this.state.volumeUnit.coefficientToLiter, this.state.fluid.gramToLiterCoefficient);
      this.setState({
        massUnit: value,
        massToVolumeCoefficient:newCoefficient,
        volumeValue: convertValue(this.state.massValue, 'mass', newCoefficient)
      });
    }
  }

  handleFluidChanged(value) {
    if(value !== undefined) {
      let newCoefficient = computeMassToVolumeCoefficient(this.state.massUnit.coefficientToGram, this.state.volumeUnit.coefficientToLiter, value.gramToLiterCoefficient);
      this.setState({
        fluid: value,
        massToVolumeCoefficient: newCoefficient,
        volumeValue: convertValue(this.state.massValue, 'mass', newCoefficient)
      });
    }
  }

  render() {
    return (
      <CSSTransition
          timeout={500}
          classNames="fade"
          in={this.state.show}>
        <div className="converter">
          <FluidPicker
            fluids = {fluids}
            onFluidChange = {value => this.handleFluidChanged(value)} />

          <UnitPickersAligner>
            <UnitPicker
              valueType = 'mass'
              value = {this.state.massValue}
              unit = {this.state.massUnit}
              units = {massUnits}
              onValueChange = {value => this.handleMassChanged(value)}
              onUnitChange = {value => this.handleMassUnitChanged(value)}/>
            ≡
            <UnitPicker
              valueType = 'volume'
              value = {this.state.volumeValue}
              unit = {this.state.volumeUnit}
              units = {volumeUnits}
              onValueChange = {value => this.handleVolumeChanged(value)}
              onUnitChange = {value => this.handleVolumeUnitChanged(value)}/>
          </UnitPickersAligner>
        </div>  
      </CSSTransition>              
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
