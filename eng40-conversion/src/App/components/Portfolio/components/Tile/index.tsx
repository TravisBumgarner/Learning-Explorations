import * as React from 'react'

import { TileWrapper, HoverContent, Image, StyledLink } from './Tile.styles'
import { categories } from '../../../../../content'
import { Title, Text } from '../../../../../sharedComponents'

const Tile = ({ project: { id, preview_img, name, category } }) => {
    const CategoryList = category.map(c => (
        <React.Fragment>
            <span>{categories[c].name}</span>
            <br />
        </React.Fragment>
    ))
    return (
        <StyledLink to={`/project/${id}`}>
            <TileWrapper src={preview_img && preview_img.src}>
                <HoverContent>
                    <Title> {name}</Title>
                    <Text size="small">{CategoryList}</Text>
                </HoverContent>
            </TileWrapper>
        </StyledLink>
    )
}

export default Tile
