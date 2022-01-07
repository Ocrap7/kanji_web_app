import { Request, Response, Router } from "express"
import { UserService } from "../services/UserServices"

export class UserController {
    public router: Router
    public user_service: UserService

    constructor() {
        this.router = Router()
        this.user_service = new UserService()
    }

    public index = async (req: Request, res: Response) => {
        res.send('get all users')
    }

    public routes() {
        this.router.get('/', this.index)
    }
}