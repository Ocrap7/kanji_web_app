import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { getConnection } from "typeorm"
import { ApiError } from "../../errors"
import { Result, StatusResult } from "../../result"
import { User } from "../models/User"
import { UserRepository } from "../repository/UserRepository"

export class AuthService {
    private user_repository: UserRepository

    constructor() {
        this.user_repository = getConnection().getRepository(User)
    }

    public register = async ({ name, email, password }: any): Promise<StatusResult<User>> => {
        try {
            // Validate user input
            if (!(email && password && name)) {
                return Result.Error(new ApiError("All input is required!", 400))
            }

            // check if user already exist
            // Validate if user exist in our database
            const oldUser = await this.user_repository
                .createQueryBuilder('user')
                .where('user.email = :email')
                .setParameters({ email })
                .getOne()

            if (oldUser)
                return Result.Error(new ApiError("User Already Exists!. Please login.", 409))

            //Encrypt user password
            const hashed_password = await bcrypt.hash(password, 10)

            // Create user in our database
            const user = await this.user_repository.create({
                name,
                email: email.toLowerCase(), // sanitize: convert email to lowercase
                password_hash: hashed_password,
            })

            // Create token
            const token = jwt.sign(
                { user_id: user.id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            )
            // save user token
            user.token = token
            this.user_repository.save(user)

            // return new user
            return Result.Ok({ status: 201, value: user })
        } catch (err) {
            console.log(err)
        }
    }

    public login = async ({ email, password }: any): Promise<StatusResult<User>> => {
        try {
            if (!(email && password))
                return Result.Error(new ApiError("All input is required!", 400))

            const user = await this.user_repository
                .createQueryBuilder('user')
                .where('user.email = :email')
                .setParameters({ email })
                .getOne()

            if (user && (await bcrypt.compare(password, user.password_hash))) {
                const token = jwt.sign(
                    { user_id: user.id, email },
                    process.env.TOKEN_KEY,
                    {
                        expiresIn: "2h",
                    }
                )

                user.token = token
                this.user_repository.save(user)

                return Result.Ok({ status: 200, value: user })
            }

            return Result.Error(new ApiError("Invalid Credentials", 400))
        } catch (err) {
            console.log(err)
        }
    }
}