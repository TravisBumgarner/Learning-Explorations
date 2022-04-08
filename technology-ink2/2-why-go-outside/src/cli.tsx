#!/usr/bin/env node

import React from 'react';
import { render } from 'ink';
require('dotenv').config()

import { WeatherPage } from './pages'
import { Header, UserInput } from './components';

const App = () => {
    const [location, setLocation] = React.useState<string>('')

    return (
        <>
            <Header />
            {location.length === 0
                ? <UserInput label="Where to" handleSubmit={setLocation} />
                : <WeatherPage location={location} />

            }
        </>
    )
}

render(<App />);