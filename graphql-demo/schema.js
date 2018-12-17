import {
    GraphQLSchema,
    GraphQLObjectType,
} from 'graphql'

const QueryType = new GraphQLObjectType({
    name: "Query",
    description: '...',

    fields: () => ({
        person: {
            type: PersonType,
            args: {
                id: { type: GraphQlString}
            },
            resolve: () => //
        }
    })
})

export default new GraphQLSchema({
    query: QueryType,
})