import mongoose, { Schema, Document }  from "mongoose";
import PermissionEnum from "./enums/PermissionEnum";
import { generateToJSONMethod } from "@/common/utils/schemaUtils";
import RoleEnum from "./enums/RoleEnum";


interface IUser {
    username: string;
    password?: string;
    firstName: string;
    lastName: string;
    phone: string;
    permissions: PermissionEnum[]; // Assuming user has permissions
    role: RoleEnum
  }
  
  interface UserDoc extends IUser, Document {}
  
  const userSchemaFields: Record<keyof IUser, any> = {
    username: { type: String, required: true, unique: true },
    password: { type: String },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    permissions: [{ type: String, enum: Object.values(PermissionEnum), default: PermissionEnum.getNormalUserDefault()}], // Array of enum values
    role: [{type: String, enum: Object.values(RoleEnum), default: RoleEnum.GUEST}]
  };
  
  const userSchema: Schema<UserDoc> = new Schema(userSchemaFields, { versionKey: false });
  generateToJSONMethod(userSchema)
  
  const User = mongoose.model<UserDoc>('User', userSchema);

  
  export { User, IUser, UserDoc };