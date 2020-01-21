import {makeExecutableSchema} from 'graphql-tools';
import {resolvers} from './resolvers';

const typeDefs = `

    type User {
    _id: ID!
    first_name: String
    last_name: String
    email: String!
    password: String
    createdAt: Date
    updateAt: Date
    }

    
    scalar Date
    
    type Query {
        getUser(email: String!): User
        getUsers: [User]
        verifyToken(data: String!): String
    }
    
    input UserInput {
        first_name: String
        last_name: String
        email: String!
        password: String!
    }
    
    
    type Mutation {
        signup(input: UserInput): String
        deleteUser(input: UserInput): String
        login(email: String!, password: String!): String
    }
`;

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

export default schema;