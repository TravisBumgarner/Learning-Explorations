import * as React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'

import projects from '../content'

import { Portfolio, NotFound, Header, SingleProject } from './components'
import { GlobalStyle } from '../theme'

import { AppWrapper } from './App.styles'

class App extends React.Component {
    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            window.scrollTo(0, 0)
        }
    }

    render() {
        const sortedProjects = projects.sort(
            (a, b) => Date.parse(b.end_date) - Date.parse(a.end_date)
        )

        return (
            <AppWrapper>
                <GlobalStyle />
                <Header />
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={props => <Portfolio {...props} projects={sortedProjects} />}
                    />
                    <Route
                        path="/project/:id"
                        render={props => <SingleProject {...props} projects={sortedProjects} />}
                    />
                    <Route component={NotFound} />
                </Switch>
            </AppWrapper>
        )
    }
}

export default App
