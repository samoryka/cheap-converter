import React, { Component } from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const appIcon = require('../resources/assets/favicon-light.png');

const HeaderContainer = styled.header`
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

class Header extends Component {
    render() {
        return (
            <HeaderLink to = {process.env.PUBLIC_URL + '/'}>
                <HeaderContainer>
                    <HeaderIcon src = {appIcon} alt="Application icon"/>
                </HeaderContainer>
            </HeaderLink>
        );
    }
}

export default Header;