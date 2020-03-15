import express from 'express';
import path from 'path'
import typeDefs from "./schema.js";
import resolvers from './resolvers.js'
import apollo from 'apollo-server-express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import mongoose from "mongoose";
import cors from 'cors'

const {ApolloServer} = apollo;


const mongoURI = `mongodb://${process.env.MONGO_HOST || "localhost"}/auth_db`;

mongoose.Promise = global.Promise;

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const server = new ApolloServer({
    typeDefs,
    resolvers,
    cors: false,
    context: (ctx) => ({
        res: ctx.res,
        req: ctx.req
    }),
    playground: {
        settings: {
            "request.credentials": "include"
        }
    },
    formatError: error => {
        const params = {
            name: error.name,
            message: error.message,
            locations: error.locations,
            stack: error.stack
        }

        return (error);
    }
});

const app = express();
app.use(cookieParser());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
server.applyMiddleware({
    app,
    path: '/api',
    cors: false
});


export default app;
