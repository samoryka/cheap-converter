import React, { Component } from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {Helmet} from "react-helmet";
import UnitPicker from './UnitPicker';
import FluidPicker from './FluidPicker';

const themes = require('../resources/parameters/themes.json').themes;
const theme = themes.filter(theme => theme.name === "amber")[0];

const Background = styled.div`
width: 100%;
height: 100%;
background: ${props => props.theme.background};
`;

const Header = styled.header`
background: ${props => props.theme.primary};
box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const PlaceholderHeaderText = styled.h1`
margin: auto;
padding: 0.5em 0 0.5em 0;
text-align: center;
color: white;
`;

const ConverterContainer = styled.div`
@media screen and (min-width: 600px), handheld {
    width: 50%;
    margin: auto;
    padding: 1em 0 1em 0;
    box-sizing: border-box;
}
@media screen and (max-width: 600px){
    width: 100%;
    padding: 1em;
    box-sizing: border-box;
}
`;
const UnitPickersAligner = styled.div`
margin: 1em 0 1em 0;
width:100%;
display:flex;
flex-flow: row wrap;
justify-content: space-between;
align-items: center;
`;

const MetaWrapper = styled.div`
height: 100%;
width: 100%;
`;

class Converter extends Component {
  constructor() {
    super();
    this.state = {
      massValue: 1,
      volumeValue: 0,
      massUnits: require('../resources/data/massUnits.json').units,
      massUnit:'g',
      volumeUnits: require('../resources/data/volumeUnits.json').units,
      volumeUnit: 'L',
      fluids: require('../resources/data/fluids.json').fluids,
      fluid: 'water',
      massToVolumeCoefficient:0.001,
    }
  }

  componentWillMount() {
    let computedMassToValueCoefficient = computeMassToVolumeCoefficient(this.state.massUnits[0].coefficientToGram,
      this.state.volumeUnits[0].coefficientToLiter,
      this.state.fluids[0].gramToLiterCoefficient);
    this.setState({
      volumeValue: convertValue(this.state.massValue, 'mass', computedMassToValueCoefficient),
      massUnit: this.state.massUnits[0],
      volumeUnit: this.state.volumeUnits[0],
      fluid: this.state.fluids[0],
      massToVolumeCoefficient: computedMassToValueCoefficient
    });
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
      <MetaWrapper>
        <Helmet>
            <meta name="theme-color" content={theme.primary} />
        </Helmet>
          
        <ThemeProvider theme={theme}>
          

          <Background>
            <Header>
              <PlaceholderHeaderText><span role="img" aria-label= "App icon placeholder">👨‍🍳</span></PlaceholderHeaderText>
            </Header>
            
            <ConverterContainer>
              <FluidPicker
              fluids = {this.state.fluids}
              onFluidChange = {value => this.handleFluidChanged(value)} />

              <UnitPickersAligner>
                <UnitPicker
                valueType = 'mass'
                value = {this.state.massValue}
                unit = {this.state.massUnit}
                units = {this.state.massUnits}
                onValueChange = {value => this.handleMassChanged(value)}
                onUnitChange = {value => this.handleMassUnitChanged(value)}/>
                ≡
                <UnitPicker
                valueType = 'volume'
                value = {this.state.volumeValue}
                unit = {this.state.volumeUnit}
                units = {this.state.volumeUnits}
                onValueChange = {value => this.handleVolumeChanged(value)}
                onUnitChange = {value => this.handleVolumeUnitChanged(value)}/>
              </UnitPickersAligner>
            </ConverterContainer>
          </Background>
        </ThemeProvider>
      </MetaWrapper>
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
