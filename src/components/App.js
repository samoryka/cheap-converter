import React, { Component } from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {Helmet} from "react-helmet";
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Header from './Header';
import Converter from './Converter/Converter';
import Footer from './Footer';
import About from './About';


const themes = require('../resources/configuration/themes.json').themes;

const MetaWrapper = styled.div`
width: 100%;
height:100%;
`;

const Background = styled.div`
width: 100%;
min-height:100%;
background: ${props => props.theme.background};;

display:flex;
flex-flow: column wrap;
justify-content: flex-start;
align-items: stretch;
`;


const ContentContainer = styled.div`
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

class App extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
      };

    handleThemeChanged(value) {
        if(value !== undefined) {
            const { cookies } = this.props;
            cookies.set('themeName', value.name, { path: '/' });

            this.setState({
            theme: value
            });
        }
    }

    componentWillMount() {
        const { cookies } = this.props;

        this.state = {
            theme: themes.filter(theme => theme.name === (cookies.get('themeName') || 'red'))[0]
          };
    }

    render() {
        return(
            <MetaWrapper>
                <Helmet>
                    <meta name="theme-color" content={this.state.theme.primary} />
                </Helmet>

                <Router>
                    <ThemeProvider theme={this.state.theme}>
                        <Background>
                            <Header />

                            <ContentContainer>
                                <Route exact = {true} path = {process.env.PUBLIC_URL + '/'} component = {Converter} />
                                <Route exact = {true} path = {process.env.PUBLIC_URL + '/about'} component = {About}/>
                            </ContentContainer>

                            <Footer 
                                pickedTheme = {this.state.theme}
                                themes = {themes}
                                onThemeChange = {value => this.handleThemeChanged(value)}/>
                        </Background>
                    </ThemeProvider>
                </Router>
            </MetaWrapper>
     );
    }

}

export default withCookies(App);