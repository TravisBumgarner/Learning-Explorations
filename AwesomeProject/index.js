import React from 'react'
import { Provider } from 'react-redux'
import {AppRegistry} from 'react-native'
import App from './App'
import {name as appName} from './app.json'
import configureStore from './src/store/configureStore'

const store = configureStore()

const RNRedux = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    )
}

AppRegistry.registerComponent(appName, () => RNRedux)
