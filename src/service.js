import * as R from 'ramda'

const baseUrl = 'http://ergast.com/api/f1/'

function get(path) {
  const cachedResults = localStorage.getItem(path)
  if (cachedResults) return Promise.resolve(JSON.parse(cachedResults))
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
        standingsTable['StandingsLists'][0]['DriverStandings'][0]
      const driver = driverStandings["Driver"]
      return {season: standingsTable['season'],
        name: `${ driver.givenName } ${ driver.familyName }`,
        wins: driverStandings.wins,
        points: driverStandings.points,
        constructor:  driverStandings.Constructors[0].constructorId
      }
    }).sort((l,r) => parseInt(r.season) - parseInt(l.season) ),
  )
}

const Service = {champions}
export default Service
