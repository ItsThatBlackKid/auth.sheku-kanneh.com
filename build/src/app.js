'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _schema = require('./schema');

var _schema2 = _interopRequireDefault(_schema);

var _resolvers = require('./resolvers');

var _resolvers2 = _interopRequireDefault(_resolvers);

var _apolloServerExpress = require('apollo-server-express');

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mongoURI = 'mongodb://' + (process.env.MONGO_HOST || "localhost") + '/auth_db';

_mongoose2.default.Promise = global.Promise;

_mongoose2.default.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var server = new _apolloServerExpress.ApolloServer({
    typeDefs: _schema2.default,
    resolvers: _resolvers2.default,
    cors: false,
    context: function context(ctx) {
        return {
            res: ctx.res,
            req: ctx.req
        };
    },
    playground: {
        settings: {
            "request.credentials": "include"
        }
    },
    formatError: function formatError(error) {
        var params = {
            name: error.name,
            message: error.message,
            locations: error.locations,
            stack: error.stack
        };

        return error;
    }
});

var app = (0, _express2.default)();
app.use((0, _cookieParser2.default)());
app.use((0, _cors2.default)());
app.use((0, _morgan2.default)('dev'));
app.use(_express2.default.json());
app.use(_express2.default.urlencoded({ extended: false }));
server.applyMiddleware({
    app: app,
    path: '/api',
    cors: false
});

app.use(_express2.default.static(_path2.default.join(__dirname, 'public')));

exports.default = app;