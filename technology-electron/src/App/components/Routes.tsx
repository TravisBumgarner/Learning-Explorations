import React from 'react'
import { Routes as ReactRouterRoute, Route } from 'react-router'

import WordCount from './WordCount'
import Home from './Home'

const Routes = () => {
    return (
        <ReactRouterRoute>
            <Route path="/" element={<Home />} />
            <Route path="/wordcount" element={<WordCount />} />
        </ReactRouterRoute>
    )
}

export default Routes