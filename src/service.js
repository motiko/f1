const baseUrl = '//ergast.com/api/f1/'

/**
 * Send GET request to Ergast API. Requset and parse JSON content. Caches results in localStorage.
 * @param {String} path to append ro base URL
 * @returns {Promise}
 */
function getErgast(path) {
  const cachedResults = localStorage.getItem(path)
  if (cachedResults) return Promise.resolve(JSON.parse(cachedResults))
  return fetch(`${baseUrl}${path}.json`)
    .then(result => result.json())
    .then(result => {
      localStorage.setItem(path, JSON.stringify(result))
      return result
    })
}

/**
 * Get race winners per season from Ergast API
 * @param {String} season
 * @returns {Promise}
 */
function raceWinners(season) {
  return getErgast(`${season}/results/1`).then(result => {
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
        fastestLap: fastestLap
          ? {speed: fastestLap.AverageSpeed.speed, time: fastestLap.Time.time}
          : undefined,
      }
    })
  })
}

/**
 * Get list of seasons with champion details
 * @param {number} fromYear
 * @param {number} toYear
 * @returns {Promise} sorted array of season results
 */
function champions(fromYear, toYear) {
  const promises = []
  for (let year = fromYear; year <= toYear; year++) {
    promises.push(getErgast(`${year}/driverStandings`))
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
          id: driver.driverId,
        }
      })
      .sort((l, r) => parseInt(r.season, 10) - parseInt(l.season, 10)),
  )
}

/**
 * Get race image from wikipedia API
 * @param {Object[]} races
 * @param {string} races[].name name of the race
 * @param {string} races[].round round in season (used to map images to matching races)
 * @returns {Promise} resolves to array of objects with imageSrc and round keys
 */
function raceImages(races) {
  const addMatchingRace = image => ({
    ...image,
    matchingRace: races.find(race => race.name === image.title),
  })
  const mapImageToRound = (images, races) => {
    return images
      .map(addMatchingRace)
      .filter(image => image.matchingRace !== undefined)
      .map(image => ({...image, round: image.matchingRace.round}))
  }
  const toDictionaryFromRoundToImageSrc = (acc, cur) => ({
    ...acc,
    [cur.round]: cur.imageSrc,
  })
  const encodedNames = races.map(r => encodeURIComponent(r.name)).join('|')
  const imageSize = 300
  return fetch(
    `//en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=pageimages&pithumbsize=${imageSize}&titles=${encodedNames}`,
  )
    .then(results => results.json())
    .then(results => {
      const pages = results.query.pages
      return Object.values(pages).filter(page => page.thumbnail)
        .map(page => ({
        imageSrc: page.thumbnail.source,
        title: page.title,
      }))
    })
    .then(images => mapImageToRound(images, races))
    .then(images => images.reduce(toDictionaryFromRoundToImageSrc, {}))
}

const Service = {champions, raceWinners, raceImages}
export default Service
