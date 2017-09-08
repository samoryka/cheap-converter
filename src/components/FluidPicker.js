import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

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
            fluidOptions: selectorOptions
        };
    }

    render() {
        return (
            <div className="FluidPicker">
            <label htmlFor="fluidPicker">fluid</label>
            <Select 
                id = "fluidPicker"
                name="Fluid"
                value = {this.props.fluid}
                options = {this.state.fluidOptions}
                onChange = {selectedValue => this.changeFluid(selectedValue)}
                clearable = {false} />
            </div>
        );
    }  

    changeFluid(selectedValue) {
    this.props.onFluidChange(selectedValue.value);
    }
}

export default FluidPicker;