import React, { useMemo, useContext } from 'react'
import { Routes, Route } from 'react-router'

import Sandbox from './Sandbox'
import designs from './designs'

const Router = () => {
    const items = Object.keys(designs).length

    return (
        <Routes>
            <Route path="/sandbox" element={<Sandbox />} />
            {Object.keys(designs).map((key: keyof typeof designs) => <Route key={key} path={`/${key.toLowerCase()}`} element={designs[key]()} />)}
        </Routes>
    )
}

export default Router