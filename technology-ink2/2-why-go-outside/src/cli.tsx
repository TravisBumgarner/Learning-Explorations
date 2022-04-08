import React from 'react';
import { render, Text, useInput } from 'ink';
import axios from 'axios';
require('dotenv').config()

const availableCities: Record<string, { lat: number, lon: number }> = {
    home: {
        lat: 42.360081,
        lon: -71.058884
    }
}

const getWeather = async (city) => {
    let response: string

    if (city in availableCities) {
        const { lat, lon } = availableCities[city]
        const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPEN_WEATHER_API_KEY}`
        const apiResponse = await axios.get(URL)
        const currentWeather = (apiResponse.data.weather.map(({ description }) => description).join(', '))
        response = `Outside it's ${currentWeather}. Stay inside!`
    } else {
        response = `Why would you need the weather in ${city}?`
    }
    return response
}

type TypeScriptDemoProps = {
    language: string
}

const Loading = () => {
    const [dots, setDots] = React.useState<number>(0)
    const [color, setColor] = React.useState<string>('green')

    React.useEffect(() => {
        if (dots < 5) {
            setColor('green')
        } else if (dots >= 5 && dots < 10) {
            setColor('yellow')
        } else {
            setColor('red')
        }

    }, [dots])

    React.useEffect(() => {
        const intervalId = setInterval(() => setDots(prev => prev + 1), 50)
        return () => clearInterval(intervalId)
    }, [])

    return <Text color={color}>Fetching weather, please hold{'.'.repeat(dots)}</Text>
}

const Header = () => {
    return <Text backgroundColor="green">Travis's Weather Serivce</Text>
}

type WeatherProps = {
    currentWeather: string
}
const Weather = ({ currentWeather }: WeatherProps) => {
    return (
        <Text>
            {currentWeather}
        </Text>
    )
}

type WeatherPageProps = {
    location: string
}
const WeatherPage = ({ location }: WeatherPageProps) => {
    const [isLoading, setIsLoading] = React.useState<boolean>(true)
    const [currentWeather, setCurrentWeather] = React.useState<string>(null)

    React.useEffect(() => {
        getWeather(location).then(r => {
            setCurrentWeather(r)
            setTimeout(() => setIsLoading(false), 1000) // Just to add dramatic timing for <Loading /> animation to shine!
        })
    })

    if (isLoading) return <Loading />

    return <Weather currentWeather={currentWeather} />
}

const App = () => {
    const [awaitingDestination, setAwaitingDestination] = React.useState<boolean>(true)
    const [location, setLocation] = React.useState<string>('')

    useInput((input, key) => {
        if (key.return) {
            setAwaitingDestination(false)
        } else if (key.backspace || key.delete) {
            setLocation(location.slice(0, location.length - 1))
        } else if (input) {
            setLocation(location + input)
        }
    });

    return (
        <>
            <Header />
            {awaitingDestination
                ? <Text>Where to: {location}</Text>
                : <WeatherPage location={location} />

            }
        </>
    )
}

render(<App />);