import React, {Component} from 'react'
import Hero from 'grommet/components/Hero'
import Image from 'grommet/components/Image'
import Box from 'grommet/components/Box'
import Tiles from 'grommet/components/Tiles'
import SeasonSummary from './SeasonSummary'
import Card from 'grommet/components/Card'

export default function Home({history, champions}) {
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
          <SeasonSummary
            champion={champion}
            history={history}
            key={champion.season}
          />
        ))}
      </Tiles>
    </React.Fragment>
  )
}
