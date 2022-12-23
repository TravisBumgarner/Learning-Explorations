import React, { useContext } from 'react'
import { Routes, Route } from 'react-router'

import Sandbox from './Sandbox'
import Designs from './Designs'

const Router = () => {
    return (
        <Routes>
            <Route path="/sandbox" element={<Sandbox />} />
            <Route path="/designs" element={<Designs />} />
        </Routes>
    )
}

export default Router