import TrophyIcon from 'grommet/components/icons/base/Trophy';
import 'grommet/grommet-hpinc.min.css'
import React, {Component} from 'react'
import logo from './logo.png'
import './App.css'
import Service from './service'
import Grommet from 'grommet/components/App'
import Hero from 'grommet/components/Hero'
import Title from 'grommet/components/Title'
import Header from 'grommet/components/Header'
import Image from 'grommet/components/Image'
import Box from 'grommet/components/Box'
import Card from 'grommet/components/Card'
import Anchor from 'grommet/components/Anchor'
import Footer from 'grommet/components/Footer'
import Columns from 'grommet/components/Columns'
import Tiles from 'grommet/components/Tiles'
import Tile from 'grommet/components/Tile'

class App extends Component {
  state = {
    champions: [],
  }
  componentDidMount() {
    Service.champions(2005, 2015).then(result => {
      console.log(result)
      this.setState({champions: result})
    })
  }
  render() {
    const {champions} = this.state
    return (
      <Grommet inline={true} centered={false}>
        <Header pad={ {horizontal: 'medium' } } >
          <Image src="f1-logo.png" size="thumb" />
          <Title>Champions</Title>
        </Header>
        <Box className="champions-list">
          <Hero
            background={<Image src="f1-1.jpg" fit="cover" full={true} />}
            backgroundColorIndex="dark">
            <Box direction="row" justify="center" align="center">
              <Box basis="1/2" align="end" pad="medium" />
              <Box basis="1/2" align="end" pad="large">
                <Box colorIndex="grey-2-a">
                  <Card
                    thumbnail="F1-logo.png"
                    heading="Champions"
                    description="See historic race results "
                  />
                </Box>
              </Box>
            </Box>
          </Hero>
          <Tiles
            flush={false}
            selectable={true}
            size="medium"
            justify="start"
            onSelect={() => {}}>
            {champions.map(champion => (
              <Tile>
                <Card
                  margin="small"
                  contentPad="medium"
                  direction="column"
                  thumbnail={`${champion.constructor}.png`}
                  heading={champion.name}

                  description={`With ${champion.wins} wins and ${
                    champion.points
                  } points`}
                  label={champion.season}
                  link={
                    <Anchor href="#" primary={true} label="Season Results" />
                  }
                />
              </Tile>
            ))}
          </Tiles>
        </Box>
        <Footer primary={true} pad="small" colorIndex="grey-1">
          <p>
            Data provided by{' '}
            <a href="http://ergast.com/mrd/" target="_blank">
              Ergast API
            </a>
          </p>
        </Footer>
      </Grommet>
    )
  }
}

export default App
