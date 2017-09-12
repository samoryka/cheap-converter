import React, { Component } from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

import ThemePicker from './ThemePicker';

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

const FooterContainer = styled.footer`
background: ${props => props.theme.backgroundDark};
box-sizing: border-box;

margin-top: auto;
padding: 0 1em 0 1em;
display:flex;
flex-flow: row nowrap;
justify-content: space-between;
align-items: center;
`;

class Footer extends Component {
    render() {
        return (
            <FooterContainer>
                <ThemePicker
                theme = {this.props.pickedTheme}
                themes = {this.props.themes}
                onThemeChange = {value => this.props.onThemeChange(value)}/>

                <Link to = {process.env.PUBLIC_URL + '/about'}>
                    <AboutButton>About</AboutButton>
                </Link>
            </FooterContainer>
        );
    }
}

export default Footer;