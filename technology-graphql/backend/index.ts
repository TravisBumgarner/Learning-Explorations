import app from './src/app'

const port = 5000

app.listen(port);
console.log(`Running a GraphQL API server at http://localhost:${port}/graphql`);