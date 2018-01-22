const {Lokka} = require('lokka')
const {Transport} = require('lokka-transport-http')

// set timezone to UTC (needed for Graphcool)
process.env.TZ = 'UTC'

const client = new Lokka({
  transport: new Transport('https://api.graph.cool/simple/v1/cixraxev60e4c0121krsia44h')
})

// convert to ISO 8601 format
const convertToDateTimeString = (str) => new Date(Date.parse(str)).toISOString()

const createPlace = async(place) => {
  const result = await client.mutate(`{
    place: createPlace(
      title: "${place.title}"
      slug: "${place.slug}"
      description: "${place.description}"
      latitude: ${place.latitude}
      longitude: ${place.longitude}
      logo: "${place.logo}"
      logo150: "${place.logo150}"
      logoFull: "${place.logoFull}"
      logoSmall: "${place.logoSmall}"
      oldId: "${place.oldId}"
      postcode: "${place.postcode}"
      summary: "${place.summary}"
      town: "${place.town}"
      type: "${place.type}"
      accentColor: "${place.accentColor}"
      address: "${place.address}"
      banner: "${place.banner}"
      bannerMedium: "${place.bannerMedium}"
      bannerThumb: "${place.bannerThumb}"
      color: "${place.color}"
      country: "${place.country}"
    ) {
      id
    }
  }`)

  return result.place.id
}

const createPlaces = async(rawPlaces) => {
  return await Promise.all(rawPlaces.map(createPlace))
}

const main = async() => {
  const rawPlaces = require('./import.json')

  // create movies
  const placeIds = await createPlaces(rawPlaces)
  // console.log(`Created ${placeIds.length} Places`)
}

main().catch((e) => console.error(e))