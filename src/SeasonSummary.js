import React from 'react'
import Tile from 'grommet/components/Tile'
import TrophyIcon from 'grommet/components/icons/base/Trophy'
import Anchor from 'grommet/components/Anchor'
import Card from 'grommet/components/Card'
import FlagIcon from 'grommet/components/icons/base/Flag'
import Box from 'grommet/components/Box'
import Value from 'grommet/components/Value'

export default function SeasonSummary({champion,history}) {
  return (
    <Tile
      onClick={() => {
        history.push(`/${champion.season}`)
      }}
      >
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
            trendIcon={<TrophyIcon className="icon" />}
            data-cy="champion-name"
          />
        }
        description={
          <Box direction="row" pad={{between: 'medium'}} margin="medium">
            <Box>
              {' '}
              <Value value={champion.wins} label="Wins"  data-cy="champion-wins"/>
            </Box>
            <Box>
              {' '}
              <Value value={champion.points} label="Points" align="end" data-cy="champion-points"
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
            label="Races"
          />
        }
      />
    </Tile>
  )
}
