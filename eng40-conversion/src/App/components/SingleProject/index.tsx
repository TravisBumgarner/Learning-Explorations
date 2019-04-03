import * as React from 'react'

import { Details } from './components'

import { SingleProjectWrapper } from './SingleProject.styles'

const SingleProject = ({
    projects,
    match: {
        params: { id }
    }
}) => {
    if (!Object.keys(projects).length) {
        return null
    }
    const project = projects.filter(project => project.id == id)[0]
    console.log(project.name)
    return (
        <SingleProjectWrapper>
            <Details project={project} />
        </SingleProjectWrapper>
    )
}

export default SingleProject
