import React, { Component } from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {Helmet} from "react-helmet";
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';

import Converter from './Converter';
import ThemePicker from './ThemePicker';
import About from './About';


const themes = require('../resources/configuration/themes.json').themes;
const appIcon = require('../resources/assets/favicon-light.png');

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

const Header = styled.header`
background: ${props => props.theme.primary};
box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
align-self: stretch;

padding: 0.5em 0 0.5em 0;

display:flex;
flex-flow: row wrap;
justify-content: center;
align-items: center;
`;
const HeaderLink = styled(Link)`
text-decoration: none;
`;

const HeaderIcon = styled.img`
color: white;
height: 2em;
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

const AboutButton = styled.button`
text-align: center;
font-size: large;
border: solid thin ${props => props.theme.primary};
background-color: transparent;
border-radius: 5px;
padding: 0.4em;
&:hover {
  background-color: ${props => props.theme.primaryLight};
  outline: none;
}
&:focus {
  background-color: transparent;
  outlint: none;
}
`;

const Footer = styled.footer`
background: ${props => props.theme.backgroundDark};
box-sizing: border-box;

margin-top: auto;
padding: 0 1em 0 1em;
display:flex;
flex-flow: row nowrap;
justify-content: space-between;
align-items: center;
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
                            <HeaderLink to = {process.env.PUBLIC_URL + '/'}>
                                <Header>
                                    <HeaderIcon src = {appIcon} alt="Application icon"/>
                                </Header>
                            </HeaderLink>

                            <ContentContainer>
                                <Route exact = {true} path = {process.env.PUBLIC_URL + '/'} component = {Converter} />
                                <Route exact = {true} path = {process.env.PUBLIC_URL + '/about'} component = {About}/>
                            </ContentContainer>

                            <Footer>
                                <ThemePicker
                                theme = {this.state.theme}
                                themes = {themes}
                                onThemeChange = {value => this.handleThemeChanged(value)}/>

                                <Link to = {process.env.PUBLIC_URL + '/about'}>
                                    <AboutButton>About</AboutButton>
                                </Link>
                            </Footer>
                        </Background>
                    </ThemeProvider>
                </Router>
            </MetaWrapper>
     );
    }

}

export default withCookies(App);