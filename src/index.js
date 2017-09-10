import React from 'react';
import ReactDOM from 'react-dom';
import { CookiesProvider} from 'react-cookie';
import './index.css';
import Converter from './components/Converter';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <CookiesProvider>
        <Converter />
    </CookiesProvider>, document.getElementById('root'));
registerServiceWorker();
