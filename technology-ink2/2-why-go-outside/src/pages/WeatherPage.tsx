
import React from 'react';
import { Text } from 'ink';

import { Loading } from '../components'
import { getWeather } from '../utilities'

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

    return (
        <Text>
            {currentWeather}
        </Text>
    )
}

export default WeatherPage