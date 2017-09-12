import React, { Component } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

const FluidPickerContainer = styled.div`
    margin: 1em 0.5em 1em 0.5em;
`;

const FluidSelect = styled(Select)`
.Select-control {
    border-color: ${props => props.theme.primary};
    background: transparent;
    &:hover {
        background-color: ${props => props.theme.primaryLight};
      }
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
`;


class FluidPicker extends Component {

    constructor(props) {
    super(props)
    // We convert our fluids to an array usable by the fluid selector
    let fluids = props.fluids;

    var selectorOptions = []
        for(var i in fluids) {
            let fluid = fluids[i];
            selectorOptions.push({
            value:fluid,
            label:fluid.name
            });
        }

        this.state = {
            fluidOptions: selectorOptions,
            selectedFluid: selectorOptions[0]
        };
    }

    render() {
        return (
            <FluidPickerContainer>
                <FluidSelect 
                    id = "fluidPicker"
                    className = "FluidSelect"
                    name="Fluid"
                    value = {this.state.selectedFluid}
                    options = {this.state.fluidOptions}
                    onChange = {selectedValue => this.changeFluid(selectedValue)}
                    clearable = {false} />
            </FluidPickerContainer>
        );
    }  

    changeFluid(selectedValue) {
    this.props.onFluidChange(selectedValue.value);
    this.setState({
        selectedFluid:selectedValue
    });
    }
}

export default FluidPicker;