const convertTemperature = (value: string) => {
  // To Celsius
  return Math.round(parseFloat(value) - 273.15)
}

export { convertTemperature }
