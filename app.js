import express from 'express';
import path from 'path'
import graphqlHTTP from "express-graphql";
import schema from "./schema";
import cookieParser from 'cookie-parser';
import morgan  from 'morgan';
import mongoose from "mongoose";
import cors from 'cors'

import indexRouter from './routes/index';
import  usersRouter from './routes/users';

const mongoURI = process.env.MONGO_URI || "mongodb://localhost/auth_db";

mongoose.Promise = global.Promise;


mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const app = express();
app.use(cors());

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use("/api", graphqlHTTP({
    schema: schema,
    graphiql: true,
    customFormatErrorFn: error => {
        const params = {
            name: error.name,
            message: error.message,
            locations: error.locations,
            stack: error.stack
        }

        console.log(error.message);
        return (params);
    }
}));

export default app;
