import React, { Component } from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {Helmet} from "react-helmet";
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';

import UnitPicker from './UnitPicker';
import FluidPicker from './FluidPicker';
import ThemePicker from './ThemePicker';


const massUnits = require('../resources/data/massUnits.json').units;
const volumeUnits = require('../resources/data/volumeUnits.json').units;
const fluids = require('../resources/data/fluids.json').fluids;
const themes = require('../resources/configuration/themes.json').themes;

const MetaWrapper = styled.div`
height: 100%;
width: 100%;
`;

const Background = styled.div`
width: 100%;
height: 100%;
background: ${props => props.theme.background};
`;

const Header = styled.header`
background: ${props => props.theme.primary};
box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;
const HeaderLink = styled(Link)`
text-decoration: none;
`;

const PlaceholderHeaderText = styled.h1`
margin: auto;
padding: 0.5em 0 0.5em 0;
text-align: center;
color: white;
&:hover{
  background: ${props => props.theme.primaryLight};
}
`;

const ConverterContainer = styled.div`
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
const UnitPickersAligner = styled.div`
margin: 1em 0 1em 0;
width:100%;
display:flex;
flex-flow: row wrap;
justify-content: space-between;
align-items: center;
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
}
`;


const AboutText = styled.span`
font-size: large;
`;

const AboutSection = () => (
<AboutText> test </AboutText>
);

const Footer = styled.footer`
background: ${props => props.theme.backgroundDark};
width:100%;
box-sizing: border-box;
position: absolute;
bottom:0;
padding: 0 1em 0 1em;
display:flex;
flex-flow: row nowrap;
justify-content: space-between;
align-items: center;
`;

class Converter extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  componentWillMount() {
    const { cookies } = this.props;

    let computedMassToValueCoefficient = computeMassToVolumeCoefficient(massUnits[0].coefficientToGram,
      volumeUnits[0].coefficientToLiter,
      fluids[0].gramToLiterCoefficient);

    let computedVolume = convertValue(1, 'mass', computedMassToValueCoefficient);

    this.state = {
      massValue: 1,
      massUnit:massUnits[0],
      volumeUnit: volumeUnits[0],
      fluid: fluids[0],
      volumeValue: computedVolume,
      massToVolumeCoefficient: computedMassToValueCoefficient,
      theme: themes.filter(theme => theme.name === (cookies.get('themeName') || 'red'))[0]
    };
  }

  handleVolumeChanged(value) {
    if(value !== undefined) {
      this.setState({
        volumeValue: value,
        massValue: convertValue(value, 'volume', this.state.massToVolumeCoefficient)
      });
    }
  }

  handleMassChanged(value) {
    if(value !== undefined) {
      this.setState({
        massValue: value,
        volumeValue: convertValue(value, 'mass', this.state.massToVolumeCoefficient)
      });
    }
  }

  handleVolumeUnitChanged(value) {
    if(value !== undefined) {
      let newCoefficient = computeMassToVolumeCoefficient(this.state.massUnit.coefficientToGram, value.coefficientToLiter, this.state.fluid.gramToLiterCoefficient);
      this.setState({
        volumeUnit: value,
        massToVolumeCoefficient:newCoefficient,
        massValue: convertValue(this.state.volumeValue, 'volume', newCoefficient)
      });
    }
  }

  handleMassUnitChanged(value) {
    if(value !== undefined) {
      let newCoefficient = computeMassToVolumeCoefficient(value.coefficientToGram, this.state.volumeUnit.coefficientToLiter, this.state.fluid.gramToLiterCoefficient);
      this.setState({
        massUnit: value,
        massToVolumeCoefficient:newCoefficient,
        volumeValue: convertValue(this.state.massValue, 'mass', newCoefficient)
      });
    }
  }

  handleFluidChanged(value) {
    if(value !== undefined) {
      let newCoefficient = computeMassToVolumeCoefficient(this.state.massUnit.coefficientToGram, this.state.volumeUnit.coefficientToLiter, value.gramToLiterCoefficient);
      this.setState({
        fluid: value,
        massToVolumeCoefficient: newCoefficient,
        volumeValue: convertValue(this.state.massValue, 'mass', newCoefficient)
      });
    }
  }

  handleThemeChanged(value) {
    if(value !== undefined) {
      const { cookies } = this.props;
      cookies.set('themeName', value.name, { path: '/' });

      this.setState({
        theme: value
      });
    }
  }

  render() {
    return (
      <MetaWrapper>
        <Helmet>
            <meta name="theme-color" content={this.state.theme.primary} />
        </Helmet>
        <Router>
          <ThemeProvider theme={this.state.theme}>
            <Background>
              <HeaderLink to = {'/'}>
              <Header>
                <PlaceholderHeaderText><span role="img" aria-label= "App icon placeholder">👨‍🍳</span></PlaceholderHeaderText>
              </Header>
              </HeaderLink>
              <Route exact = {true} path = "/" render = { () => (
                <ConverterContainer>
                  <FluidPicker
                    fluids = {fluids}
                    onFluidChange = {value => this.handleFluidChanged(value)} />

                  <UnitPickersAligner>
                    <UnitPicker
                      valueType = 'mass'
                      value = {this.state.massValue}
                      unit = {this.state.massUnit}
                      units = {massUnits}
                      onValueChange = {value => this.handleMassChanged(value)}
                      onUnitChange = {value => this.handleMassUnitChanged(value)}/>
                    ≡
                    <UnitPicker
                      valueType = 'volume'
                      value = {this.state.volumeValue}
                      unit = {this.state.volumeUnit}
                      units = {volumeUnits}
                      onValueChange = {value => this.handleVolumeChanged(value)}
                      onUnitChange = {value => this.handleVolumeUnitChanged(value)}/>
                  </UnitPickersAligner>
              </ConverterContainer>
              )} />

              <Route exact = {true} path = "/about" component = {AboutSection}/>

              <Footer>
                <ThemePicker
                  theme = {this.state.theme}
                  themes = {themes}
                  onThemeChange = {value => this.handleThemeChanged(value)}/>

                  <Link to = {'/about'}>
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

function computeMassToVolumeCoefficient(coefficientToGram, coefficientToLiter, fluidCoefficient) {
  return (coefficientToGram / coefficientToLiter) * fluidCoefficient;
}

function convertValue(value, valueType, massToVolumeCoefficient) {
  if(typeof(value) !== undefined)
    {
      switch(valueType){
        case 'mass':
          return +(value * massToVolumeCoefficient).toFixed(2);
        case 'volume':
          return +(value * (1/massToVolumeCoefficient)).toFixed(2);
        default:
          return +(value * massToVolumeCoefficient).toFixed(2);
      }
    }
  else
    return 0;
}

export default withCookies(Converter);
