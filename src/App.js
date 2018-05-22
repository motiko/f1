import FlagIcon from 'grommet/components/icons/base/Flag'
import BrandGrommetOutlineIcon from 'grommet/components/icons/base/BrandGrommetOutline'
import SocialGithubIcon from 'grommet/components/icons/base/SocialGithub'
import 'grommet/grommet-hpinc.min.css'
import React, {Component} from 'react'
import './App.css'
import Service from './service'
import GrommetApp from 'grommet/components/App'
import Header from 'grommet/components/Header'
import Image from 'grommet/components/Image'
import Box from 'grommet/components/Box'
import Anchor from 'grommet/components/Anchor'
import Footer from 'grommet/components/Footer'
import Label from 'grommet/components/Label'
import Home from './Home'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import SeasonDetails from './SeasonDetails'
import Toast from 'grommet/components/Toast'

class App extends Component {
  state = {
    champions: [],
    error: null,
  }
  componentDidMount() {
    Service.champions(2005, 2015)
      .then(result => {
        this.setState({champions: result})
      })
      .catch(error => {
        this.setState({error:error.message})
      })
  }

  render() {
    const {champions, error} = this.state
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <GrommetApp inline={true} centered={false}>
          {error && (
            <Toast status="critical">Connection error:{error}. Please try again. </Toast>
          )}
          <Header pad={{horizontal: 'medium'}}>
            <Anchor
              href={process.env.PUBLIC_URL + "/"}
              label="Epic Races"
              icon={<Image src="f1-logo.png" size="thumb" className="icon" />}
              data-cy="app-logo"
            />
          </Header>
          <Box className="main-content">
            <Route
              exact
              path="/"
              render={props => (
                <Home champions={champions} history={props.history} />
              )}
            />
            <Route
              path={`/:season`}
              render={props => {
                return (
                  <SeasonDetails
                    season={props.match.params.season}
                    champions={champions}
                  />
                )
              }}
            />
          </Box>
          <Footer
            primary={true}
            pad="small"
            justify="between"
            colorIndex="grey-1">
            <p>
              <Label> Created By</Label>{' '}
              <Anchor
                href="https://github.com/motiko"
                label="motiko"
                icon={<SocialGithubIcon />}
              />
            </p>
            <p>
              <Label>Designed with </Label>
              <Anchor
                href="http://grommet.io/"
                label="Grommet"
                icon={<BrandGrommetOutlineIcon />}
              />
            </p>
            <p>
              <Label>Data provided by </Label>
              <Anchor
                href="http://ergast.com/mrd/"
                label="Ergast API"
                icon={<FlagIcon />}
              />
            </p>
          </Footer>
        </GrommetApp>
      </Router>
    )
  }
}

export default App
