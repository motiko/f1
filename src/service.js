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

function raceWinners(season) {
  return get(`${season}/results/1`).then(result => {
    const races = result['MRData']['RaceTable']['Races']
    return races.map(race => {
      const results = race.Results[0]
      const fastestLap = results.FastestLap
      const driver = results.Driver
      return {
        name: race.raceName,
        location: race.Circuit.Location.locality,
        round: race.round,
        winnerName: `${driver.givenName} ${driver.familyName}`,
        winnerId: driver.driverId,
        nationality: driver.nationality,
        number: driver.permanentNumber,
        laps: race.laps,
        fastestLapSpeed: fastestLap.AverageSpeed.speed,
        fastestLapTime: fastestLap.Time.time,
      }
    })
  })
}

function raceImages(races) {
  const encodedNames = races.map(r => encodeURIComponent(r.name)).join('|')
  const imageSize = 300
  return fetch(
    `http://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=pageimages&pithumbsize=${imageSize}&titles=${encodedNames}`,
  )
    .then(results => results.json())
    .then(results => {
      const pages = results.query.pages
      return Object.values(pages).map(page => ({
        imageSrc: page.thumbnail.source,
        title: page.title,
      }))
    })
    .then(images =>
      images
        .map(image => ({
          ...image,
          matchingRace: races.find(race => race.name === image.title),
        }))
        .filter(image => image.matchingRace !== undefined)
        .map(image => ({...image, round: image.matchingRace.round})),
    )
    .then(images =>
      images.reduce((acc,cur) => ({...acc,[cur.round]: cur.imageSrc}), {}),
    )
}

function champions(fromYear, toYear) {
  const promises = []
  for (let year = fromYear; year <= toYear; year++) {
    promises.push(get(`${year}/driverStandings`))
  }
  return Promise.all(promises).then(results =>
    results
      .map(result => {
        const standingsTable = result['MRData']['StandingsTable']
        const driverStandings =
          standingsTable['StandingsLists'][0]['DriverStandings'][0]
        const driver = driverStandings['Driver']
        return {
          season: standingsTable['season'],
          name: `${driver.givenName} ${driver.familyName}`,
          wins: driverStandings.wins,
          points: driverStandings.points,
          constructor: driverStandings.Constructors[0].constructorId,
          id : driver.driverId
        }
      })
      .sort((l, r) => parseInt(r.season, 10) - parseInt(l.season, 10)),
  )
}

const Service = {champions, raceWinners, raceImages}
export default Service
