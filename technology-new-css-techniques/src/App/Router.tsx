import React, { useContext } from 'react'
import { Routes, Route } from 'react-router'

import Sandbox from './Sandbox'
import Design1 from './Design1'

const Router = () => {
    return (
        <Routes>
            <Route path="/sandbox" element={<Sandbox />} />
            <Route path="/1" element={<Design1 />} />
        </Routes>
    )
}

export default Router