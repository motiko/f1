import React from 'react'
import {render, shallow, mount} from 'enzyme'
import Tile from 'grommet/components/Tile'
import RaceSummary from './RaceSummary'

const minimalRaceData = {winnerName: 'Michael Schumacher', round: '2'}
const race = {
  ...minimalRaceData,
  fastestLap: {speed: '212.488', time: '1:29.844'},
}

it('renders without crashing ', () => {
  shallow(<RaceSummary race={minimalRaceData} />)
  shallow(<RaceSummary race={race} />)
  shallow(<RaceSummary race={race} championsRace={true} />)
})

it('renders values', () => {
  const wrapper = render(<RaceSummary race={race} championsRace={true} />)
  expect(wrapper.find('.grommetux-value__value')).toHaveLength(3)
  expect(wrapper.text()).toContain(race.winnerName)
  expect(wrapper.text()).toContain(race.fastestLap.speed)
  expect(wrapper.text()).toContain(race.fastestLap.time)
})

it('renders tile component', () => {
  const wrapper = mount(<RaceSummary race={race} championsRace={true} />)
  expect(wrapper.find(Tile)).toHaveLength(1)
  wrapper.unmount()
})

