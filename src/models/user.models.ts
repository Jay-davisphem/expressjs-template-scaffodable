import mongoose, { Schema, Document }  from "mongoose";
import PermissionEnum from "./enums/PermissionEnum";
import { generateToJSONMethod } from "../common/utils/schemaUtils";
import RoleEnum from "./enums/RoleEnum";


interface UserCredentials{
  email: string,
  password?: string
}
interface IUser extends UserCredentials {
  username: string;
  firstName: string;
  lastName: string;
  phone: string;
  permissions?: PermissionEnum[]; // Assuming user has permissions
  role?: RoleEnum
}
  

interface UserDoc extends IUser, Document {}

const commonDict = { type: String, required: true }

const userSchemaFields: Record<keyof IUser, any> = {
  username: { ...commonDict, unique: true },
  password: { type: String },
  firstName: commonDict,
  lastName: commonDict,
  phone: commonDict,
  email: {
    type: String,
    unique: [true, "email already exists in database!"],
    lowercase: true,
    trim: true,
    required: [true, "email not provided"],
    validate: {
      validator: function (v: string) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: '{VALUE} is not a valid email!'
    }
  },
  permissions: [{ type: String, enum: Object.values(PermissionEnum), default: PermissionEnum.getNormalUserDefault(),
    required: [true, "Please specify user permission"],
  }],
  role: {
      type: String, enum: Object.values(RoleEnum), default: RoleEnum.GUEST,
      required: [true, "Please specify user role"]
    }
}

const userSchema: Schema<UserDoc> = new Schema(userSchemaFields, { versionKey: false, timestamps: true });
generateToJSONMethod(userSchema)

const User = mongoose.model<UserDoc>('User', userSchema);


export { User, IUser, UserDoc, UserCredentials}