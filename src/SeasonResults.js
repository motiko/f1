import React, {Component} from 'react'
import ClockIcon from 'grommet/components/icons/base/Clock'
import TrophyIcon from 'grommet/components/icons/base/Trophy'
import Image from 'grommet/components/Image'
import Label from 'grommet/components/Label'
import Value from 'grommet/components/Value'
import Card from 'grommet/components/Card'
import Tiles from 'grommet/components/Tiles'
import Tile from 'grommet/components/Tile'
import Service from './service'
import PropTypes from 'prop-types'

class SeasonResults extends Component {
  static propsTypes = {
    champions: PropTypes.array,
    season: PropTypes.string,
  }

  state = {
    races: [],
    raceImages: {},
  }

  componentDidMount() {
    Service.raceWinners(this.props.season)
      .then(races => {
        this.setState({races})
        return races
      })
      .then(races => Service.raceImages(races))
      .then(raceImages => this.setState({raceImages}))
  }

  render() {
    const {races, raceImages} = this.state
    const {champions, season} = this.props
    const seasonWinner = champions.find(champ => champ.season === season)
    return (
      <Tiles flush={false} size="medium" justify="start">
        {races.map(race => (
          <Tile
            key={race.round}
            margin="large"
            colorIndex="light-2"
            style={{
              background:
                seasonWinner && seasonWinner.id === race.winnerId
                  ? ' #daf1fb'
                  : '',
            }}>
            <Card
              contentPad="medium"
              direction="column"
              reverse={true}
              thumbnail={<Image src={raceImages[race.round]} fit="cover" />}
              description={
                <React.Fragment>
                  <Value
                    value={race.winnerName}
                    label="Winner"
                    trendIcon={
                      seasonWinner &&
                      seasonWinner.id === race.winnerId && <TrophyIcon/>
                    }
                    align="start"
                  />
                  <Value
                    value={race.fastestLapTime}
                    label="Fastest Lap"
                    icon={<ClockIcon />}
                    align="end"
                    reverse={true}
                  />
                  <Value
                    value={race.fastestLapSpeed}
                    label="Average Speed"
                    units="kph"
                    align="end"
                    reverse={true}
                  />
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
        ))}
      </Tiles>
    )
  }
}

export default SeasonResults
