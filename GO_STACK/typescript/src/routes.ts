
import { Request, Response} from 'express'
import createUser from './services/CreateUsers'

export function helloWorld(request: Request, response: Response) {
    const user = createUser({
        email: 'leonardohably@hotmail.com',
        password: '12345',
    })

    console.log(user.email)

    return response.json({ message: 'Hello World'})
}