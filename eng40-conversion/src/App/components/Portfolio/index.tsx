import * as React from 'react'
import styled from 'styled-components'

import { Tile } from './components'

const GridWrapper = styled.div`
    margin-top: 20px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`

const Portfolio = ({ projects }) => {
    const Projects = Object.values(projects).map(project => {
        return <Tile key={project.id} project={project} />
    })

    return <GridWrapper>{Projects}</GridWrapper>
}

export default Portfolio
