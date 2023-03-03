import { useContext } from 'react'
import { Routes, Route } from 'react-router'

import { context } from 'context'
import { Home, Error } from '../pages'

const Router = () => {
    const { state } = useContext(context)

    if (state.hasErrored) {
        return <Error />
    }

    return (
        <Routes>
            <Route path="/error" element={<Error />} />
            <Route path="/" element={<Home />} />
        </Routes>
    )
}

export default Router