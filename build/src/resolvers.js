'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _user = require('./models/user');

var _user2 = _interopRequireDefault(_user);

var _token = require('./models/token');

var _token2 = _interopRequireDefault(_token);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var secret = process.env.JWT_SECRET || _fs2.default.readFileSync("./src/rsa");

var resolvers = {

    Query: {
        getUser: function getUser(root, _ref, _ref2) {
            var _this = this;

            var req = _ref2.req,
                res = _ref2.res;

            _objectDestructuringEmpty(_ref);

            return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var authorization, verified;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                console.log(req.get('host'));
                                authorization = req.cookies.jwt;

                                console.log(authorization);

                                if (authorization) {
                                    _context.next = 5;
                                    break;
                                }

                                throw new Error("Unable to verify token provided");

                            case 5:
                                _context.prev = 5;
                                _context.next = 8;
                                return _jsonwebtoken2.default.decode(authorization, secret);

                            case 8:
                                verified = _context.sent;
                                return _context.abrupt('return', verified.data.user);

                            case 12:
                                _context.prev = 12;
                                _context.t0 = _context['catch'](5);

                                console.log(_context.t0);
                                throw new Error("Token is invalid. Please login again");

                            case 16:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, _this, [[5, 12]]);
            }))();
        },
        verify: function verify(root, _ref3, _ref4) {
            var _this2 = this;

            var data = _ref3.data;
            var req = _ref4.req,
                res = _ref4.res;
            return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var auth, verified;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                auth = req.cookies.jwt;

                                if (auth) {
                                    _context2.next = 3;
                                    break;
                                }

                                throw new Error("No Token Found");

                            case 3:
                                _context2.prev = 3;
                                _context2.next = 6;
                                return _jsonwebtoken2.default.verify(auth, secret);

                            case 6:
                                verified = _context2.sent;
                                return _context2.abrupt('return', !!verified);

                            case 10:
                                _context2.prev = 10;
                                _context2.t0 = _context2['catch'](3);
                                throw _context2.t0;

                            case 13:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, _this2, [[3, 10]]);
            }))();
        },
        getUsers: function getUsers(root) {
            var _this3 = this;

            return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.next = 2;
                                return _user2.default.find();

                            case 2:
                                return _context3.abrupt('return', _context3.sent);

                            case 3:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, _this3);
            }))();
        }
    },

    Mutation: {
        signup: function signup(root, _ref5) {
            var _this4 = this;

            var input = _ref5.input;
            return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
                var user;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _context4.next = 2;
                                return _user2.default.count({ email: input.email });

                            case 2:
                                user = _context4.sent;

                                console.log(user);

                                if (!(user > 0)) {
                                    _context4.next = 7;
                                    break;
                                }

                                console.log(user);
                                throw new Error('User with  email ' + input.email + ' already exists');

                            case 7:
                                _context4.next = 9;
                                return _user2.default.create(input);

                            case 9:
                                user = _context4.sent;


                                delete user.password;
                                return _context4.abrupt('return', "User created");

                            case 12:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, _this4);
            }))();
        },
        deleteUser: function deleteUser(root, _ref6) {
            var _this5 = this;

            var input = _ref6.input;
            return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
                var user;
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                user = _user2.default.findOne({ email: input.email });
                                _context5.next = 3;
                                return user.validatePassword(input.password);

                            case 3:
                                if (!_context5.sent) {
                                    _context5.next = 6;
                                    break;
                                }

                                _user2.default.findOneAndDelete({ email: input.email });
                                return _context5.abrupt('return', "User deleted");

                            case 6:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, _this5);
            }))();
        },
        login: function login(root, _ref7, _ref8) {
            var _this6 = this;

            var email = _ref7.email,
                password = _ref7.password;
            var req = _ref8.req,
                res = _ref8.res;
            return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
                var user, token;
                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                // Delete the previous token.

                                _token2.default.deleteMany({ user_email: email });

                                _context6.next = 3;
                                return _user2.default.findOne({ email: email });

                            case 3:
                                user = _context6.sent;
                                _context6.next = 6;
                                return user.validatePassword(password);

                            case 6:
                                if (!_context6.sent) {
                                    _context6.next = 26;
                                    break;
                                }

                                if (user.password) delete user.password;
                                _context6.prev = 8;
                                _context6.next = 11;
                                return _jsonwebtoken2.default.sign({ data: { user: user } }, secret, { expiresIn: "20d" });

                            case 11:
                                token = _context6.sent;
                                _context6.next = 14;
                                return _token2.default.create({ user_email: user.email, data: token });

                            case 14:
                                //max age of 20 days.
                                res.cookie('jwt', token, {
                                    maxAge: 60 * 60 * 24 * 20 * 1000,
                                    domain: process.env.DOMAIN || '.test-sheku.com'
                                });
                                res.cookie('user_id', user._id, {
                                    maxAge: 60 * 60 * 24 * 20 * 1000,
                                    domain: process.env.DOMAIN || ".test-sheku.com"
                                });
                                console.log("successful");
                                return _context6.abrupt('return', "Login successful");

                            case 20:
                                _context6.prev = 20;
                                _context6.t0 = _context6['catch'](8);

                                console.log(_context6.t0);
                                throw _context6.t0;

                            case 24:
                                _context6.next = 27;
                                break;

                            case 26:
                                throw new Error("Unable to login with details provided");

                            case 27:
                            case 'end':
                                return _context6.stop();
                        }
                    }
                }, _callee6, _this6, [[8, 20]]);
            }))();
        }
    }
};

exports.default = resolvers;