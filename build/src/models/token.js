"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var TokenSchema = Schema({
    user_email: { type: String, required: [true, "Token must have relevant user email"] },
    data: { type: String, required: [true, "Token data must be provided"], unique: [true, "Token already exists"] }
}, { timestamps: { createdAt: 'created_at' } });

exports.default = _mongoose2.default.model('Token', TokenSchema);