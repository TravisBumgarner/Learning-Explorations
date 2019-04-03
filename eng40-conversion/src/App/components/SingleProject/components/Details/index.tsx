import * as React from 'react'
import styled from 'styled-components'

import { skills } from '../../../../../content'
import { Text, ExternalLink, Title } from '../../../../../sharedComponents'
import { DetailsWrapper, Content, Sidebar, Row, Image, SubContent } from './Details.styles'

const SectionWrapper = styled.div`
    width: 100%;
    margin: 20px 0;
`

const Section = ({ children, title }) => {
    return (
        <SectionWrapper>
            <Title size="small">{title}</Title>
            <Text size="small">{children}</Text>
        </SectionWrapper>
    )
}

const Details = ({
    project: {
        description,
        location,
        organization,
        skill,
        link,
        preview_img,
        name,
        start_date,
        end_date,
        image
    }
}) => {
    const Description = description.split('\n').map((d, idx) => <Text key={idx}>{d}</Text>)
    const Locations = location.map(l => l.name).join(', ')
    const Organizations = organization.map(o => o.name).join(', ')
    const Skills = skill
        .map(s => skills[s].name)
        .sort((a, b) => {
            a - b
        })
        .join(', ')
    const Links = link.map(l => {
        return (
            <li key={l.id}>
                <ExternalLink primary href={l.src}>
                    <Text>{l.name}</Text>
                </ExternalLink>
            </li>
        )
    })
    const Images = image.map(i => <Image src={i.src} />)
    return (
        <DetailsWrapper previewImageSrc={preview_img && preview_img.src}>
            <Row>
                <Sidebar>
                    <img src={preview_img.src} />
                </Sidebar>

                <Content>
                    <Title size="medium">{name}</Title>
                    {!!Links.length && (
                        <Section title="Links">
                            <ul>{Links}</ul>
                        </Section>
                    )}
                    <Section title="Description">{Description}</Section>

                    <SubContent>
                        <Section title="Skills">
                            <Text>{Skills}</Text>
                        </Section>

                        <Section title="Meta">
                            <Text>
                                When: {`${start_date.slice(0, -3)} - ${end_date.slice(0, -3)}`}
                            </Text>
                            <Text>Where: {Locations}</Text>
                            <Text>Who: {Organizations}</Text>
                        </Section>
                    </SubContent>
                    {image.length ? <Section title="Photos">{Images}</Section> : null}
                </Content>
            </Row>
        </DetailsWrapper>
    )
}

export default Details
