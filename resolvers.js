import fs from "fs";
import User from './models/user';
import Token from './models/token'
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || fs.readFileSync("./rsa");

export const resolvers = {

    Query: {
        async getUser(root, {email}) {
            return User.findOne({email: email})
        },

        async getUsers(root) {
            return User.find();
        },

        async verifyToken(root, {data}) {
            const token = await Token.findOne({data: data});

            if(!token) {
                return  "Token is invalid. Please login again"
            }

            try {
                const verified = await jwt.verify(token.data, secret);
                return "Token verified"
            } catch (e) {
                console.log(e);
                return "Token is invalid. Please login again"
            }
        }
    },

    Mutation: {
        async signup(root, {input}) {
            let user = await User.count({email: input.email});
            console.log(user);

            if(user > 0) {
                console.log(user);
                throw new Error(`User with  email ${input.email} already exists`);
            }

            user = User.create(input);

            delete user.password;
            return "User created"
        },

        async deleteUser(root, {input}) {
            const user = User.findOne({email: input.email});

            if (await user.validatePassword(input.password)) {
                User.findOneAndDelete({email: input.email});
                return "User deleted"
            }

        },

        async login(root, {email, password}) {
            // Delete the previous token.

            try {
                Token.findOneAndRemove({user_email: email});
            } catch (e) {
                // if there is no token, do nothing
            }


            const user = await User.findOne({email: email});
            if (await user.validatePassword(password)) {
                if (user.password) delete user.password;
                try {
                    const token = await jwt.sign({data: {user: user}}, secret, {expiresIn: "20d"});
                    await Token.create({user_email: user.email, data: token});
                    return token;
                } catch (error) {
                    console.log(error);
                    return "Internal Server Error"
                }
            } else {
                return "Invalid user password"
            }
        }

    }
};