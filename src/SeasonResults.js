import React, {Component} from 'react'
import Race from './Race'
import Tiles from 'grommet/components/Tiles'
import Service from './service'
import PropTypes from 'prop-types'

class SeasonResults extends Component {
  static propTypes = {
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
          <Race
            race={race}
            championsRace={seasonWinner && seasonWinner.id === race.winnerId}
            imageSrc={raceImages[race.round]}
          />
        ))}
      </Tiles>
    )
  }
}

export default SeasonResults
