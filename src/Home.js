import TrophyIcon from 'grommet/components/icons/base/Trophy'
import FlagIcon from 'grommet/components/icons/base/Flag'
import Value from 'grommet/components/Value'
import React, {Component} from 'react'
import Hero from 'grommet/components/Hero'
import Anchor from 'grommet/components/Anchor'
import Image from 'grommet/components/Image'
import Box from 'grommet/components/Box'
import Card from 'grommet/components/Card'
import Tiles from 'grommet/components/Tiles'
import Tile from 'grommet/components/Tile'

class Home extends Component {
  render() {
    const {history, champions} = this.props
    return (
      <React.Fragment>
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
                  description="Historic race results "
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
            <Tile
              onClick={() => {
                history.push(`/${champion.season}`)
              }}
              key={champion.season}>
              <Card
                margin="medium"
                contentPad="large"
                direction="column"
                thumbnail={`${champion.constructor}.png`}
                heading={
                  <Value
                    value={champion.name}
                    label="Champion"
                    align="start"
                    trendIcon={<TrophyIcon className="icon"/>}
                  />
                }
                description={
                  <Box
                    direction="row"
                    pad={{between: 'medium'}}
                    margin="medium">
                    <Box>
                      {' '}
                      <Value value={champion.wins} label="Wins" />
                    </Box>
                    <Box>
                      {' '}
                      <Value
                        value={champion.points}
                        label="Points"
                        align="end"
                      />
                    </Box>
                  </Box>
                }
                label={`Season ${champion.season}`}
                link={
                  <Anchor
                    href={`/${champion.season}`}
                    icon={<FlagIcon />}
                    primary={true}
                    label="See All Races"
                  />
                }
              />
            </Tile>
          ))}
        </Tiles>
      </React.Fragment>
    )
  }
}

export default Home
