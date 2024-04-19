import { AlgorithmT } from '../types/algo';
import crypto from 'crypto';
import bcrypt from 'bcryptjs'
import EnvVars from '../config'

class EncryptionService {
  private static instance: EncryptionService;
  private readonly algorithm: AlgorithmT;
  private readonly secretKey: Buffer;

  constructor(algorithm: AlgorithmT = 'aes-128-cbc', secretKey: string = EnvVars.Jwt.Secret) {
    this.algorithm = algorithm;
    this.secretKey = crypto.createHash('sha256').update(secretKey).digest();
  }

  public static getInstance(algorithm: AlgorithmT, secretKey: string): EncryptionService {
    if (!EncryptionService.instance) {
      EncryptionService.instance = new EncryptionService(algorithm, secretKey);
    }
    return EncryptionService.instance;
  }

  encrypt(data: any): string {
    const dataString = JSON.stringify(data);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(this.algorithm, this.secretKey, iv);
    let encryptedData = cipher.update(dataString, 'utf-8', 'hex');
    encryptedData += cipher.final('hex');
    return `${iv.toString('hex')}:${encryptedData}`;
  }

  decrypt(encryptedData: string): any {
    const [ivHex, encryptedTextHex] = encryptedData.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const encryptedText = Buffer.from(encryptedTextHex, 'hex');
    const decipher = crypto.createDecipheriv(this.algorithm, this.secretKey, iv);
    let decryptedData = decipher.update(encryptedText);
    decryptedData = Buffer.concat([decryptedData, decipher.final()]);
    return JSON.parse(decryptedData.toString());
  }

  async  encryptPassword(password: string) {
    // Combine password with the secret key
    const combinedPassword = password + EnvVars.Jwt.Secret;

    // Generate a salt (bcrypt automatically generates one)
    const saltRounds = 12; // You can adjust the number of rounds for complexity
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash the combined password with the salt
    const hash = await bcrypt.hash(combinedPassword, salt);

    return hash;
}

async  comparePassword(inputPassword: string, storedHashedPassword: string) {
    // Combine the input password with the secret key
    const combinedPassword = inputPassword + EnvVars.Jwt.Secret

    // Compare the combined password hash with the stored hash
    const match = await bcrypt.compare(combinedPassword, storedHashedPassword);
    
    return match; // Returns true if the passwords match, false otherwise
}
}

const encryptionServiceInstance = EncryptionService.getInstance('aes-256-cbc', EnvVars.Jwt.Secret);
export default encryptionServiceInstance