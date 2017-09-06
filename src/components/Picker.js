import React, { Component } from 'react';

class Picker extends Component {
    render() {
      return (
        <div className="Picker">
          <label htmlFor={this.props.valueType}>{this.props.valueType}</label>
          <input  
            id = {this.props.valueType}
            type = "number"
            min = "0"
            value = {this.props.value}
            onInput={evt => this.updateInputValue(evt)}
          />
        </div>
      );
    }  
  
    updateInputValue(evt) {
      this.props.onValueChange(evt.target.value);
    }
  }

  export default Picker;