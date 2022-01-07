import bodyParser from 'body-parser'
import express from 'express'
import "reflect-metadata"
import { createConnection } from 'typeorm'
import ormconfig from '../ormconfig.json'
import { route_apiv1 } from './api/v1'

export class Server {
    private app: express.Application

    constructor() {
        this.app = express()
        this.configure_app()
        this.routes()
    }

    public configure_app() {
        this.app.set('port', 3000)
        this.app.use(bodyParser.urlencoded({ extended: false }))
    }

    public async routes() {
        await createConnection(ormconfig as any)
        console.log('done')
        route_apiv1(this.app)
    }

    public start() {
        this.app.listen(this.app.get('port'), () => {
            console.log(`API listening on port ${this.app.get('port')}`)
        })
    }
}

