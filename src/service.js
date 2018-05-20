import * as R from 'ramda'

const baseUrl = 'http://ergast.com/api/f1/'

function get(path) {
  const cachedResults = localStorage.getItem(path)
  // if (cachedResults) return Promise.resolve(JSON.parse(cachedResults))
  return fetch(`${baseUrl}${path}.json`)
    .then(result => result.json())
    .then(result => {
      localStorage.setItem(path, JSON.stringify(result))
      return result
    })
}

function champions(fromYear, toYear) {
  const promises = []
  for (let year = fromYear; year <= toYear; year++) {
    promises.push(get(`${year}/driverStandings`))
  }
  return Promise.all(promises).then(results =>
    results.map(result => {
      const standingsTable = result['MRData']['StandingsTable']
      const driverStandings =
        standingsTable['StandingsLists'][0]['DriverStandings']
      return {season: standingsTable['season'], winner: driverStandings[0]}
    }),
  )
}

const Service = {champions}
export default Service
