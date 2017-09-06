import React from 'react';
import ReactDOM from 'react-dom';
import Scale from './Scale';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Scale />, div);
});
