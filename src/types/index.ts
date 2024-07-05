export type optionType = {
    name: string
    country: string
    lat: number
    lon: number
  }
export type DropdownOptionType = {
    value: string;
    label: string;
  }
  export type forecastType = {
    name: string
    country: string
    list: [
      {
        dt: number
        // timezone: number
        main: {
          feels_like: number
          humidity: number
          pressure: number
          temp: number
          temp_max: number
          temp_min: number
        }
        weather: [
          {
            main: string
            icon: string
            description: string
            id: number
          }
        ]
        wind: {
          speed: number
          gust: number
          deg: number
        }
        clouds: {
          all: number
        }
        pop: number
        visibility: number
      }
    ]
    sunrise: number
    sunset: number
  }
  