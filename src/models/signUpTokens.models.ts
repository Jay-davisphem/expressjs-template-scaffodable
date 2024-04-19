import mongoose, { Schema, Document }  from "mongoose";

import EnvVars from "../config";
import { generateToJSONMethod } from "../common/utils/schemaUtils";


interface IToken {
    email: string;
    token: string;
    expiresAt: Date;
  }
  
  interface TokenDoc extends IToken, Document {}
  

  
  const tokenSchema: Schema<TokenDoc> = new Schema({
    email: {type: String, required: true, unique: true},
    token: {type: String, required: true},
    expiresAt: {type: Date, default: Date.now, expires: EnvVars.EXPIRES_DURATION }
  }, { versionKey: false, timestamps: true });
  
  generateToJSONMethod(tokenSchema)
  const Token = mongoose.model<TokenDoc>('Token', tokenSchema);

  
  export { Token, IToken, TokenDoc };