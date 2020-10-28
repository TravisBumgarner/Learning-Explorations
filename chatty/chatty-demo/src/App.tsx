import React, { Component } from 'react';
import {
    Route,
    BrowserRouter as Router,
    Switch,
    Redirect,
} from "react-router-dom";
// import Home from './pages/Home';
// import Chat from './pages/Chat';
// import Signup from './pages/Signup';
// import Login from './pages/Login';
import { auth } from './firebase'

function PublicRoute({ component: Component, authenticated, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) => authenticated === false
                ? <Component {...props} />
                : <Redirect to='/chat' />}
        />
    )
}

function PrivateRoute({ component: Component, authenticated, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) => authenticated === true
                ? <Component {...props} />
                : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
        />
    )
}

function signup(email, password) {
    return auth().createUserWithEmailAndPassword(email, password)
}

function signin(email, password) {
    return auth().signInWithEmailAndPassword(email, password)
}

const App = () => {
    const [isLoading, setIsLoading] = React.useState(true)
    const [isAuthenticated, setIsAuthenticated] = React.useState(false)

    React.useEffect(() => {
        auth().onAuthStateChanged((user) => {
            if (user) {
                setIsAuthenticated(true)
            }
            setIsLoading(false)
        })
    })

    return isLoading === true ? <h2>Loading...</h2> : (
        <Router>
            <Switch>
                <Route exact path="/" component={Home}></Route>
                <PrivateRoute path="/chat" authenticated={isAuthenticated} component={Chat}></PrivateRoute>
                <PublicRoute path="/signup" authenticated={isAuthenticated} component={Signup}></PublicRoute>
                <PublicRoute path="/login" authenticated={isAuthenticated} component={Login}></PublicRoute>
            </Switch>
        </Router>
    );
}

export default App