import React from 'react'
import {render, shallow, mount} from 'enzyme'
import SeasonSummary from './SeasonSummary'
import Tile from 'grommet/components/Tile'

const champion = {
  constructor: 'mercedes',
  id: 'hamilton',
  name: 'Lewis Hamilton',
  points: '381',
  season: '2015',
  wins: '10',
}

it('renders without crashing ', () => {
  shallow(<SeasonSummary champion={champion} />)
})

it('renders values', () => {
  const wrapper = render(<SeasonSummary champion={champion} />)
  expect(wrapper.text()).toContain(champion.name)
  expect(wrapper.text()).toContain(champion.wins)
  expect(wrapper.text()).toContain(champion.points)
})


it('renders tile component', () => {
  const wrapper = mount(<SeasonSummary champion={champion} />)
  expect(wrapper.find(Tile)).toHaveLength(1)
  wrapper.unmount()
})
