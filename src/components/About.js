import React, { Component } from 'react';
import styled from 'styled-components';
import {BrowserRouter as Router, Link} from 'react-router-dom';

const Card = styled.div`
border-radius: 5px;
border-color: ${props => props.theme.primary};
border-style: solid;
border-width: thin;

margin: 1em 0.5em 1em 0.5em;

display:flex;
flex-flow: column wrap;
justify-content: center;
align-items: center;
`;

const AboutLabel = styled.h1`
background: ${props => props.theme.primary};
text-align: center;
font-size: large;
align-self: stretch;
margin:0;
padding: 0.5em 1em 0.5em 1em;
flex: 0 1 auto;
`;

const AboutText = styled.span`
font-size: large;
padding: 0.5em 1em 0.5em 1em;
text-align: justify;
`;

const BackLink = styled(Link)`
align-self: flex-start;
`;

const BackButton = styled.button`
text-align: center;
font-size: large;
background-color: ${props => props.theme.primary};
border: none;
border-radius: 0 5px 0 0;
padding: 0.4em;
&:hover {
  background-color: ${props => props.theme.primaryLight};
}
`;

class About extends Component {

    render() {
        return (
            <Card>  
                <AboutLabel>About this app</AboutLabel>  
                <AboutText>
                    <a href="https://github.com/samoryka">I</a> did not want to spend money on a scale to
                    weigh the ingredients I use while cooking since I already have means to measure their volumes.
                    <br/><br/>
                    Making a weight/volume converter was thus the perfect occasion to learn how to use <a href="https://nodejs.org">Node.js</a>
                    , <a href="https://github.com/samoryka">React</a> and other JavaScript frameworks/libraries/tools.
                    <br/>
                </AboutText>
                <BackLink to = {'/'}>
                    <BackButton>Back</BackButton>
                </BackLink>
            </Card>
        );
    }
}


export default About;
