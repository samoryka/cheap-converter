import React, { Component } from 'react';
import Picker from './Picker';


class Converter extends Component {
  constructor() {
    super();
    this.state = {
      fluid: 'water',
      massValue: 1,
      volumeValue: 0,
      massUnit:'g',
      volumeUnit: 'L',
      massToVolumeCoefficient:0.001,
    }
  }

  componentWillMount() {
    this.setState({
      volumeValue: convertValue(this.state.massValue, 'mass', this.state.massToVolumeCoefficient)
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

  render() {
    return (
      <div className = "Converter">
        <Picker
        valueType = 'mass'
        value = {this.state.massValue}
        unit = {this.state.massUnit}
        onValueChange = {value => this.handleMassChanged(value)}/>
        <Picker
        valueType = 'volume'
        value = {this.state.volumeValue}
        unit = {this.state.volumetUnit}
        onValueChange = {value => this.handleVolumeChanged(value)}/>
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
