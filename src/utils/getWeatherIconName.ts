const getWeatherIconName = (id: string) => {
  const weatherGroups: { [key: string]: string } = {
    // Group 2xx: Thunderstorm
    '200': 'thunderstorm',
    '201': 'thunderstorm',
    '202': 'thunderstorm',
    '210': 'thunderstorm',
    '211': 'thunderstorm',
    '212': 'thunderstorm',
    '221': 'thunderstorm',
    '230': 'thunderstorm',
    '231': 'thunderstorm',
    '232': 'thunderstorm',
    // Group 3xx: Drizzle
    '300': 'shower_rain',
    '301': 'shower_rain',
    '302': 'shower_rain',
    '310': 'shower_rain',
    '311': 'shower_rain',
    '312': 'shower_rain',
    '313': 'shower_rain',
    '314': 'shower_rain',
    '321': 'shower_rain',
    // Group 5xx: Rain
    '500': 'rain',
    '501': 'rain',
    '502': 'rain',
    '503': 'rain',
    '504': 'rain',
    '511': 'rain',
    '520': 'rain',
    '521': 'rain',
    '522': 'rain',
    '531': 'rain',
    // Group 6xx: Snow
    '600': 'snow',
    '601': 'snow',
    '602': 'snow',
    '611': 'snow',
    '612': 'snow',
    '613': 'snow',
    '615': 'snow',
    '616': 'snow',
    '620': 'snow',
    '621': 'snow',
    '622': 'snow',
    // Group 7xx: Atmosphere
    '701': 'mist',
    '711': 'mist',
    '721': 'mist',
    '731': 'mist',
    '741': 'mist',
    '751': 'mist',
    '761': 'mist',
    '762': 'mist',
    '771': 'mist',
    '781': 'mist',
    '800': 'clear_sky',
    '801': 'few_clouds',
    '802': 'scattered_clouds',
    '803': 'scattered_clouds',
    '804': 'scattered_clouds'
  }

  return weatherGroups[id] || weatherGroups['200']
}

export { getWeatherIconName }
