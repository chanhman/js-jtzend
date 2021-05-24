// GET
// https://candidate.hubteam.com/candidateTest/v3/problem/dataset?userKey=68c3301ad0767cae16d3f03ae86f
//
// {
//   "partners": [
//     {
//       "firstName": "Darin",
//       "lastName": "Daignault",
//       "email": "ddaignault@hubspotpartners.com",
//       "country": "United States",
//       "availableDates": ["2017-05-03", "2017-05-06"]
//     }
//   }
// }

// POST
// https://candidate.hubteam.com/candidateTest/v3/problem/result?userKey=68c3301ad0767cae16d3f03ae86f
//
// {
//   "countries": [
//     {
//       "attendeeCount": 1,
//       "attendees": ["cbrenna@hubspotpartners.com"],
//       "name": "Ireland",
//       "startDate": "2017-04-29" // or null
//     }
//   ]
// }

// I have an array of dates
// I should loop through each date and see if there are 2 consecutuve days
// Example, if there is a date of 2017-05-03, the next day in the array should be 2017-05-04
// If that is true, put it in an array where it does have a contiuous day,
// Next, see if the countries that have a continus day have the same starting day
// If true, update the attendeeCount, grab the attendees email, save the country name, and use the most recent date
// If none ExtensionScriptApis, this country object will have a startDate of null

import axios from 'axios'
import _ from 'lodash'

const BASE_URL = 'https://candidate.hubteam.com/candidateTest/v3/problem'

const getResults = async function () {
  try {
    const response = await axios.get(
      `${BASE_URL}/dataset?userKey=68c3301ad0767cae16d3f03ae86f`
    )

    if (!response.statusText === 'OK') {
      throw new Error()
    }

    const data = response.data
    dateCheck(data)
  } catch (error) {
    console.error('Error:', error.message)
  }
}

const postResults = async function (data) {
  try {
    const newObject = data

    const response = await axios.post(
      `${BASE_URL}/result?userKey=68c3301ad0767cae16d3f03ae86f`,
      newObject
    )

    if (!response.statusText === 'OK') {
      throw new Error()
    }

    const addedObjected = response.data
    console.log(`Posted:`, addedObjected)
  } catch (error) {
    console.error('Error:', error.message)
  }
}

function dateCheck(data) {
  const partners = data.partners
  const partnersWithStartDate = partners.map(d => ({...d, startDate: []}))
  const final = { "countries": [] }

  partnersWithStartDate.forEach((partner) => {
    const availableDates = partner.availableDates

    availableDates.forEach((availableDate, index) => {
      const day = new Date(availableDates[index])
      const nextDay = new Date(availableDates[index + 1])
      const diff = ((nextDay - day) / (1000 * 3600 * 24))

      if (diff === 1) {
        partner.startDate.push(availableDates[index], availableDates[index + 1])
      }
    })
  })

  const filterPartners = partnersWithStartDate.map(partner => {
    if (partner.startDate.length > 0) {
      return {...partner, startDate: partner.startDate[0]}
    }

    return {...partner, startDate: null}
  });

  const partnersGroupedByCountry = _.groupBy(filterPartners, function(partner) {
    return partner.country
  });

  const groupByStartDate = []

  _.map(partnersGroupedByCountry, function(country) {
    let group =_.groupBy(country, function(partner) {
      return partner.startDate
    })

    groupByStartDate.push(group)
  })

  const mostDates = []
  _.map(groupByStartDate, function(date) {
    mostDates.push(_.sortBy(date, obj => -obj.length))
  })

  const removeDates = _.map(mostDates, function(date) {
    return date[0]
  })

  _.map(removeDates, function(date) {
    let attendeeCount = date.length
    let attendeees = []
    let name
    let startDate

    _.map(date, function(d, i) {
      if (i === 0) {
        name = d.country
        startDate = d.startDate
      }

      attendeees.push(d.email)
    })

    final.countries.push({
      attendeeCount,
      attendeees,
      name,
      startDate})
  })

  postResults(final)
}

getResults()
