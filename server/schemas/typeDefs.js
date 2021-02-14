// imports gql tagged template function
const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Query {
        WoodlandConsulting: String
    }
    type Category {
        _id: ID
        name: String
    }

    type Project {
        _id: ID
        name: String
        desctiption: String
        image: String
        date: String
        location: String
        category: Category

    }

    type Admin {
        _id: ID
        firstName: String
        lastName: String
        email: String
    }

    type Auth {
        token: ID
        user: Admin
    }
`;

module.exports = typeDefs;