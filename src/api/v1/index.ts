import { Router } from "express"
import { AuthController } from "./controllers/AuthController"
import { UserController } from "./controllers/UserController"


export const route_apiv1 = (parent: Router) => {
    const router = Router()

    let user_controller = new UserController()
    router.use('/user', user_controller.router)

    let auth_controller = new AuthController()
    router.use('/auth', auth_controller.router)

    parent.use('/api/v1', router)
    parent.use('/', (res, req, nex) => {})
}