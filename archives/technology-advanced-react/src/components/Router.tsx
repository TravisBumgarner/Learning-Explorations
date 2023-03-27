import { lazy, useContext } from 'react'
import { Routes, Route } from 'react-router'

import { context } from 'context'

const Home = lazy(() => import('../pages/Home'));
const Error = lazy(() => import('../pages/Error'));

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