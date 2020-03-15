"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _templateObject = _taggedTemplateLiteral(["\n\n    type User {\n    _id: ID!\n    first_name: String\n    last_name: String\n    email: String!\n    createdAt: Date\n    updatedAt: Date\n    }\n\n    \n    scalar Date\n    \n    type Query {\n        getUser: User\n        getUsers: [User]\n        verify: Boolean\n    }\n    \n    input UserInput {\n        first_name: String\n        last_name: String\n        email: String!\n        password: String!\n    }\n    \n    \n    type Mutation {\n        signup(input: UserInput): String\n        deleteUser(input: UserInput): String\n        login(email: String!, password: String!): String\n    }\n"], ["\n\n    type User {\n    _id: ID!\n    first_name: String\n    last_name: String\n    email: String!\n    createdAt: Date\n    updatedAt: Date\n    }\n\n    \n    scalar Date\n    \n    type Query {\n        getUser: User\n        getUsers: [User]\n        verify: Boolean\n    }\n    \n    input UserInput {\n        first_name: String\n        last_name: String\n        email: String!\n        password: String!\n    }\n    \n    \n    type Mutation {\n        signup(input: UserInput): String\n        deleteUser(input: UserInput): String\n        login(email: String!, password: String!): String\n    }\n"]);

var _apolloServerExpress = require("apollo-server-express");

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var typeDefs = (0, _apolloServerExpress.gql)(_templateObject);

exports.default = typeDefs;