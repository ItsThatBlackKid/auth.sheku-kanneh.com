import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    first_name: {
        type: String
    },

    last_name: {
        type: String
    },
    email: {
        type: String,
        required: [true, "User email is required"],
        unique: true,
        validator: (v) => {
            /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
        }
    },

    password: {
        type: String,
        required: [true, "User password is required"]
    }
}, {timestamps: true});

UserSchema.pre('save', async function(next) {
    console.log(this);
    this.password = await bcrypt.hash(this.password, 10);
    next();
});



UserSchema.methods.validatePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

export default  mongoose.model('User',UserSchema);

