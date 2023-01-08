import { Heading, Paragraph, StyledNavLink } from 'sharedComponents'

const Error = () => (
    <div>
        <Heading.H2>Whoops!</Heading.H2>
        <Paragraph>Sorry, there was an error.</Paragraph>
        <Paragraph><StyledNavLink to="/" text="Return Home" /></Paragraph>
    </div>
)

export default Error