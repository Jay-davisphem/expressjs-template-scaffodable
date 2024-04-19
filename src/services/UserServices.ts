import { User, Token, IUser } from '../models'
import EmailService from './EmailService'
import bcrypt from 'bcryptjs'

import EnvVars from '../config'
export default class UserService{
    constructor(private user: typeof User, private token?: typeof Token){}
    saveEncryptedData = async (userDetails: IUser, encryptedData: string, session?: any) => {
        const userExists = await this.user.findOne({email: userDetails.email})
        if (userExists) {
            // If a token already exists, throw an error
            throw new Error(`User exists`);
        }
        const existingToken = await this.token?.findOne({email: userDetails.email})
        if (existingToken) {
            // If a token already exists, throw an error
            throw new Error(`Token for the user with email ${userDetails.email} has already been created.`);
        }
        const token = await this.token?.create({
            email: userDetails.email,
            token: encryptedData,
        })
        return token
    }

    createEmailService = async (userDetails: IUser, encryptedData: string, callbackUrl?: string) => {
        return new EmailService(
            'Account Initialization', 'Acount Initialization', 
            'Click the following link to complete your registration', 
            userDetails.email, 
            `${callbackUrl ?? EnvVars.BASE_URL + '/v1/complete-registration'}/${encryptedData}`
        )
    }

    createUser = async (data: IUser) => {
        let user = new User(data)
        user = await user.save()
    }
      
}