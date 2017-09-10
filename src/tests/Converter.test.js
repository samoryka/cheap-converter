import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import Converter from '../components/Converter';


describe('Converter component', () =>{
  let renderer = ReactTestUtils.createRenderer();

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Converter />, div);
  });
  
  it('has a correct initial test', () => {
    renderer.render(<Converter />);
    let output = renderer.getRenderOutput();
    console.log(output);
  });

});
