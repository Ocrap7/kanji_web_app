import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export const verify_token = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.autok
    if (!token) 
        return res.status(403).send("A token is required for authentication!")
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY)
        req.user = decoded as any
    } catch {
        return res.status(401).send('Invalid Token')
    } 
    return next()
}