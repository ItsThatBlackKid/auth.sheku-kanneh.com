import fs from "fs";
import User from '../models/user';
import Token from '../models/token'
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || fs.readFileSync("./rsa");

const resolvers = {

    Query: {
        async getUser(root, {}, {req, res}) {
            console.log(req.get('host'));
            const authorization = req.cookies.jwt;
            console.log(authorization);

            if (!authorization) {
                throw new Error("Unable to verify token provided")
            }

            try {
                const verified = await jwt.decode(authorization, secret);
                return verified.data.user
            } catch (e) {
                console.log(e);
                throw new Error("Token is invalid. Please login again")
            }
        },

        async verify(root, {data}, {req, res}) {
            const auth = req.cookies.jwt;
            if (!auth) {
                throw new Error("No Token Found")
            }

            try {
                const verified = await jwt.verify(auth, secret);

                return !!verified;
            } catch (e) {
                throw e;
            }
        },

        async getUsers(root) {
            return await User.find();
        }
    },


    Mutation: {
        async signup(root, {input}) {
            let user = await User.count({email: input.email});
            console.log(user);

            if (user > 0) {
                console.log(user);
                throw new Error(`User with  email ${input.email} already exists`);
            }

            user = await User.create(input);


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

        async login(root, {email, password}, {req, res}) {
            // Delete the previous token.

             Token.deleteMany({user_email: email});


            const user = await User.findOne({email: email});
            if (await user.validatePassword(password)) {
                if (user.password) delete user.password;
                try {
                    const token = await jwt.sign({data: {user: user}}, secret, {expiresIn: "20d"});
                    await Token.create({user_email: user.email, data: token});
                    //max age of 20 days.
                    res.cookie('jwt', token, {
                        maxAge: (60 * 60 * 24 * 20 * 1000),
                        domain: process.env.DOMAIN || '.test-sheku.com'
                    });
                    res.cookie('user_id', user._id, {
                        maxAge: (60 * 60 * 24 * 20 * 1000),
                        domain: process.env.DOMAIN || ".test-sheku.com"
                    });
                    console.log("successful");
                    return "Login successful"
                } catch (error) {
                    console.log(error);
                    throw error
                }
            } else {
                throw new Error("Unable to login with details provided")
            }
        }

    }
};

export default resolvers