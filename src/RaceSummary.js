import React from 'react'
import ClockIcon from 'grommet/components/icons/base/Clock'
import TrophyIcon from 'grommet/components/icons/base/Trophy'
import Image from 'grommet/components/Image'
import Value from 'grommet/components/Value'
import Card from 'grommet/components/Card'
import Tile from 'grommet/components/Tile'
import Label from 'grommet/components/Label'

export default function RaceSummary({race, championsRace, imageSrc}) {
  return (
    <Tile
      margin="large"
      colorIndex="light-2"
      style={{
        background:
          championsRace ? ' #daf1fb' : '',
      }}>
      <Card
        contentPad="medium"
        direction="column"
        reverse={true}
        thumbnail={<Image src={imageSrc} fit="cover" />}
        description={
          <React.Fragment>
            <Value
              value={race.winnerName}
              label="Winner"
              trendIcon={
                championsRace && <TrophyIcon />
              }
              align="start"
            />
            {race.fastestLap && (
              <React.Fragment>
                <Value
                  value={race.fastestLap.time}
                  label="Fastest Lap"
                  icon={<ClockIcon />}
                  align="end"
                  reverse={true}
                />
                <Value
                  value={race.fastestLap.speed}
                  label="Average Speed"
                  units="kph"
                  align="end"
                  reverse={true}
                />
              </React.Fragment>
            )}
          </React.Fragment>
        }
        label={
          <React.Fragment>
            <Label uppercase={true} margin="small">
              {`Round ${race.round}`}{' '}
            </Label>
            <Label uppercase={true} margin="small">
              {race.name}
            </Label>
          </React.Fragment>
        }
      />
    </Tile>
  )
}
