import { Server } from "./server"
import { Request } from 'express'
import dotenv from 'dotenv'
import { User } from './api/v1/models/User'
dotenv.config()

declare module "express" {
    export interface Request {
        user: { user_id: number, email: string }
    }
}

const server = new Server()
server.start()