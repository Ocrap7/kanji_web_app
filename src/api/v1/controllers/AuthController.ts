import { Request, Response, Router } from "express"
import { AuthService } from '../services/AuthService'

export class AuthController {
    public router: Router
    public auth_service: AuthService

    constructor() {
        this.router = Router()
        this.auth_service = new AuthService()
        this.routes()
    }

    public index = async (req: Request, res: Response) => {
        res.send('get all users')
    }

    public register = async (req: Request, res: Response) => {
        let result = await this.auth_service.register(req.body || {})
        result.ok(value => {
            res.status(value.status)
            res.cookie('autok', value.value.token)
            res.json(value.value)
        }).err(error => {
            res.status(error.status)
            res.json({ status: error.status, message: error.message })
        })
    }
    public login = async (req: Request, res: Response) => {
        let result = await this.auth_service.login(req.body || {})
        result.ok(value => {
            res.status(value.status)
            res.cookie('autok', value.value.token)
            res.json(value.value)
        }).err(error => {
            res.status(error.status)
            res.json({ status: error.status, message: error.message })
        })
    }

    public routes() {
        this.router.get('/', this.index)
        this.router.post('/register', this.register)
        this.router.post('/login', this.login)
    }
}