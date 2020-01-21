import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const TokenSchema = Schema({
    user_email: {type: String, required: [true, "Token must have relevant user email"]},
    data: {type: String, required: [true, "Token data must be provided"], unique: [true, "Token already exists"]}
}, {timestamps: {createdAt: 'created_at'}});

export default mongoose.model('Token',TokenSchema);