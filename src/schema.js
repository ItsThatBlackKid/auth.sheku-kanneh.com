import apollo from 'apollo-server';
const {gql} = apollo;

const typeDefs = gql`

    type User {
    _id: ID!
    first_name: String
    last_name: String
    email: String!
    createdAt: Date
    updatedAt: Date
    }

    
    scalar Date
    
    type Query {
        getUser: User
        getUsers: [User]
        verify: Boolean
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

export default typeDefs;