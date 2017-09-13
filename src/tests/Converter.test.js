import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import {computeMassToVolumeCoefficient, convertValue} from '../ConversionLogic'
import Converter from '../components/Converter/Converter';
import UnitPicker from '../components/Converter/UnitPicker';
import FluidPicker from '../components/Converter/FluidPicker';


describe('Converter component', () =>{

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Converter />, div);
  });

  it('renders correctly', () => {
    const wrapper = shallow(<Converter />);

    expect(wrapper.find(UnitPicker).filter({valueType: 'volume'}).length).equal(1);
    expect(wrapper.find(UnitPicker).filter({valueType: 'mass'}).length).equal(1);
    expect(wrapper.find(FluidPicker).length).equal(1);
  });
  
  it('has a correct initial test', () => {
    const wrapper = shallow(<Converter />);

    const initialMassValue = 1;
    const initialMassUnit = require('../resources/data/massUnits.json').units[0];
    const initialVolumeUnit = require('../resources/data/volumeUnits.json').units[0];
    const initialFluid = require('../resources/data/fluids.json').fluids[0];
    const initialMassToVolumeCoefficient = computeMassToVolumeCoefficient(initialMassUnit.coefficientToGram, initialVolumeUnit.coefficientToLiter, initialFluid.gramToLiterCoefficient);
    const initialVolumeValue = convertValue(initialMassValue, 'mass', initialMassToVolumeCoefficient);

    expect(wrapper.state('massValue')).equal(initialMassValue);
    expect(wrapper.state('massUnit')).equal(initialMassUnit);
    expect(wrapper.state('volumeUnit')).equal(initialVolumeUnit);
    expect(wrapper.state('fluid')).equal(initialFluid);
    expect(wrapper.state('massToVolumeCoefficient')).equal(initialMassToVolumeCoefficient);
    expect(wrapper.state('volumeValue')).equal(initialVolumeValue);
  });

  it('updates the volume when the mass is updated', () => {
    const wrapper = shallow(<Converter />);

    const newMass = 2;
    wrapper.instance().handleMassChanged(newMass);

    const volumeUnitPicker = wrapper.find(UnitPicker).filter({valueType: 'volume'});
    const computedVolumeValue = convertValue(wrapper.state('massValue'),'mass', wrapper.state('massToVolumeCoefficient'));

    expect(volumeUnitPicker.props().value).equal(computedVolumeValue);
  });

  it('updates the mass when the volume is updated', () => {
    const wrapper = shallow(<Converter />);

    const newVolume = 2;
    wrapper.instance().handleVolumeChanged(newVolume);

    const massUnitPicker = wrapper.find(UnitPicker).filter({valueType: 'mass'});
    const computedMassValue = convertValue(wrapper.state('volumeValue'),'volume', wrapper.state('massToVolumeCoefficient'));
    
    expect(massUnitPicker.props().value).equal(computedMassValue);
  });

  it('updates the volume when the mass unit is updated', () => {
    const wrapper = shallow(<Converter />);

    const newMassUnit = require('../resources/data/massUnits.json').units[1];
    wrapper.instance().handleMassUnitChanged(newMassUnit);

    const volumeUnitPicker = wrapper.find(UnitPicker).filter({valueType: 'volume'});
    const computedVolumeValue = convertValue(wrapper.state('massValue'),'mass', wrapper.state('massToVolumeCoefficient'));
    
    expect(volumeUnitPicker.props().value).equal(computedVolumeValue);
  });

  it('updates the mass when the volume unit is updated', () => {
    const wrapper = shallow(<Converter />);

    const newVolumeUnit = require('../resources/data/volumeUnits.json').units[1];
    wrapper.instance().handleVolumeUnitChanged(newVolumeUnit);
    
    const massUnitPicker = wrapper.find(UnitPicker).filter({valueType: 'mass'});
    const computedMassValue = convertValue(wrapper.state('volumeValue'),'volume', wrapper.state('massToVolumeCoefficient'));
    
    expect(massUnitPicker.props().value).equal(computedMassValue);
  });

  it('updates the volume when the fluid is updated', () => {
    const wrapper = shallow(<Converter />);

    const newFluid = require('../resources/data/fluids.json').fluids[1];
    wrapper.instance().handleFluidChanged(newFluid);

    const volumeUnitPicker = wrapper.find(UnitPicker).filter({valueType: 'volume'});
    const computedVolumeValue = convertValue(wrapper.state('massValue'),'mass', wrapper.state('massToVolumeCoefficient'));
    
    expect(volumeUnitPicker.props().value).equal(computedVolumeValue);
  });

});