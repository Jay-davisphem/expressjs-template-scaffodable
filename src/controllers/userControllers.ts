import UserService from "../services/UserServices";
import { IUser, UserCredentials, Token, User } from "../models";
import RoleEnum from "../models/enums/RoleEnum";
import { Response, Request } from "express";
import jwt from 'jsonwebtoken'
import encryptionServiceInstance from "../services/EncryptionService";
import mongoose from "mongoose";

import HttpStatusCodes from "../common/utils/HTTPStatusCodes";
import { ApiJsonData } from "../common/utils/misc";
import PermissionEnum from "../models/enums/PermissionEnum";
import Envvars from '../config'

export default class UserController{
    constructor(private userService: UserService){}

    initiateRegistration = async (req: Request<{callbackUrl?: string}>, res: Response) => {
        // encrypt userDetails
        const session = await mongoose.startSession();
        session.startTransaction();
        
        const userDetails: IUser  = req.body;
        try{
            const encryptedData = encryptionServiceInstance.encrypt(userDetails)
            
            // Generate securityCode encrypt, save and pass it to emailService
            const securityCode = ''
            await this.userService.saveEncryptedData(userDetails, encryptedData, securityCode)
            
            const callbackUrl = req.params.callbackUrl

            
            const emailService = await this.userService.createEmailService(userDetails, encryptedData, securityCode, callbackUrl)
            const eRes = await emailService.sendEmail()
            
            console.log(eRes)

            await session.commitTransaction();
            session.endSession();
            res.status(HttpStatusCodes.OK).json(new ApiJsonData('success', eRes, eRes))
        }catch(err){
            
            await session.abortTransaction();
            session.endSession();
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(new ApiJsonData('error', 'Error', {error: err}))
        }
    }

    getEncryptedData = async (req: Request, res: Response) => {
        try{

            const {encryptedData, securityCode} = req.body;
            if (!securityCode){
                throw new Error("Invalid Security Code! Please provide security code sent via email.")
            }
            const token = await Token.findOne({ token: encryptedData })
            
            // Check if the encryptedData exists and if the token is valid
            if (!encryptedData || !token) {
                throw new Error("Invalid Token");
            }
            const isValidSecurityCode = await encryptionServiceInstance.comparePassword(securityCode, token.securityCode)
            if (!isValidSecurityCode){
                throw new Error('Invalid Security Code.')
            }

            // Decrypt the encrypted data
            let data: IUser = encryptionServiceInstance.decrypt(encryptedData);
            return res.status(HttpStatusCodes.OK).json(new ApiJsonData('success', 'Data decoded', data).valueOf())
        }catch(err: any){
            // Handle specific error messages
            if ((err.message as string).startsWith('Invalid')) {
                return res.status(HttpStatusCodes.BAD_REQUEST).json(new ApiJsonData('error', err.message).valueOf());
            }
            
            // Handle generic internal server errors
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(new ApiJsonData('error', err.message));
        }

    }
    

    completeRegistration = async (req: Request, res: Response) => {
        try {
            const {encryptedData, securityCode} = req.body;
            if (!securityCode){
                throw new Error("Invalid Security Code! Please provide security code sent via email.")
            }
            const token = await Token.findOne({ token: encryptedData })
            
            // Check if the encryptedData exists and if the token is valid
            if (!encryptedData || !token) {
                throw new Error("Invalid Token");
            }
            
            const isValidSecurityCode = await encryptionServiceInstance.comparePassword(securityCode, token.securityCode)
            if (!isValidSecurityCode){
                throw new Error('Invalid Security Code.')
            }
            // Decrypt the encrypted data
            let data: IUser = encryptionServiceInstance.decrypt(encryptedData);
            console.log('decrypted data', data)
            
            // Merge request body data with decrypted data
            // If a key exists in both, the request body data takes precedence
            const requestBodyData = req.body?.data || {};
            data = { ...data, ...requestBodyData };
            
            // Encrypt the password and update the data object
            if (data?.password) {
                const encryptedPassword = await encryptionServiceInstance.encryptPassword(data.password);
                data.password = encryptedPassword;
            } else{
                throw new Error("No Password")
            }
            
            if (!data?.role){
                data.role = RoleEnum.AUTH_USER
            }
            if (!data?.permissions){
                data.permissions = PermissionEnum.getNormalUserDefault()
            }
            // Create the user
            await this.userService.createUser(data);
            await token.deleteOne()
            
            // Send a success response
            res.status(HttpStatusCodes.CREATED).json(new ApiJsonData('success', 'User created successfully'));
            
        } catch (err: any) {
            console.error('error', err)
            // Handle specific error messages
            if ((err.message as string).startsWith('Invalid') || err.message === 'No Password') {
                return res.status(HttpStatusCodes.BAD_REQUEST).json(new ApiJsonData('error', err.message).valueOf());
            }
            
            // Handle generic internal server errors
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(new ApiJsonData('error', err.message));
        }
    };

    login = async (req: Request, res: Response) => {
        // login based on role and return jwt token
        try{
            const user = await User.findOne({email: req.body.email}) as IUser
            if (!user){
                return res.status(HttpStatusCodes.NOT_FOUND).json(new ApiJsonData('error', 'User Not found').valueOf())
            }
            const pwdIsValid = await encryptionServiceInstance.comparePassword(req.body.password, user.password as string)
            console.log('pwdIsValid', pwdIsValid)
            if (!pwdIsValid){
                return res.status(HttpStatusCodes.UNAUTHORIZED).json(new ApiJsonData('error', 'Invalid Password').valueOf())
            }
            const jwtToken = jwt.sign( {_id: (user as any)._id}, Envvars.Jwt.Secret, {expiresIn: 86400})
            console.log('jwtTokenUser', jwtToken, user)
            return res.status(HttpStatusCodes.OK).json(new ApiJsonData('success', 'Login successfull', {user, accessToken: jwtToken}).valueOf())
        }catch(err: any){
            return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(new ApiJsonData('error', err?.message))
        }

    }
}