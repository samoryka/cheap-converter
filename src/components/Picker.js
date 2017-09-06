import React, { Component } from 'react';

class Picker extends Component {
    render() {
      return (
        <input  
          type = "number"
          min = "0"
          value = {this.props.value}
          onInput={evt => this.updateInputValue(evt)}
        />
      );
    }  
  
    updateInputValue(evt) {
      this.props.onValueChange(evt.target.value);
    }
  }

  export default Picker;