import React, {Component} from 'react'
import Race from './Race'
import Tiles from 'grommet/components/Tiles'
import Service from './service'
import PropTypes from 'prop-types'
import Toast from 'grommet/components/Toast'

class SeasonResults extends Component {
  static propTypes = {
    champions: PropTypes.array,
    season: PropTypes.string,
  }

  state = {
    races: [],
    raceImages: {},
    error: null,
  }

  componentDidMount() {
    Service.raceWinners(this.props.season)
      .then(races => {
        this.setState({races})
        return races
      })
      .then(races => Service.raceImages(races))
      .then(raceImages => this.setState({raceImages}))
      .catch(error => this.setState({error:error.message}))
  }

  render() {
    const {races, raceImages, error} = this.state
    const {champions, season} = this.props
    const seasonWinner = champions.find(champ => champ.season === season)
    return (
      <React.Fragment>
        {error && (
            <Toast status="critical">Connection error:{error}. Please try again. </Toast>
        )}
        <Tiles flush={false} size="medium" justify="start">
          {races.map(race => (
            <Race
              key={race.round}
              race={race}
              championsRace={seasonWinner && seasonWinner.id === race.winnerId}
              imageSrc={raceImages[race.round]}
            />
          ))}
        </Tiles>
      </React.Fragment>
    )
  }
}

export default SeasonResults
