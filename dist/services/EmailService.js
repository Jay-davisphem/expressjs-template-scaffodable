"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../config"));
const htmlContent = (title, message, url, securityCode) => `
<!DOCTYPE html>
<html>
<head>
  <title>Email Template</title>
  <style>
    /* Add your CSS styles here */
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      border-radius: 10px;
      padding: 20px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    h1 {
      color: #333333;
    }
    p {
      color: #666666;
      font-size: 16px;
    }

    a{
      width: 100px;
      height: 50px;
      font-weight: bolder;
      font-size: 2em; 
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>${title}!</h1>
    <p>Security code: ${securityCode}</p>
    <p>Do not share the security code with anyone.</p>
    <p>${message}. <a href="${url !== null && url !== void 0 ? url : ''}" title="Click link">Click Here</a></p>
  </div>
</body>
</html>
`;
class EmailService {
    constructor(subject, title, message, to, securityCode, url) {
        this.getHtmlContent = (subject, title, message, url) => {
            return htmlContent(title, message, url, this.securityCode);
        };
        this.sendEmail = () => __awaiter(this, void 0, void 0, function* () {
            let val = '';
            this.transporter.sendMail({
                from: this.email,
                to: this.to,
                subject: this.subject,
                html: this.htmlContent,
            }).catch(res => {
                val = 'error';
                return 'Error';
            });
            if (val == 'error')
                throw new Error('Email Error');
            return 'Message Sent';
        });
        this.subject = subject;
        this.email = config_1.default.ADMIN_MAIL;
        this.title = title;
        this.message = message;
        this.to = to;
        this.securityCode = securityCode;
        this.htmlContent = this.getHtmlContent(subject, title, message, url);
    }
    get transporter() {
        let transporter = nodemailer_1.default.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                type: "OAuth2",
                clientId: config_1.default.OAUTH_CLIENT_ID,
                clientSecret: config_1.default.OAUTH_CLIENT_SECRET,
                user: config_1.default.ADMIN_MAIL,
                refreshToken: config_1.default.GOOGLE_REFRESH_TOKEN,
                accessToken: config_1.default.GOOGLE_ACCESS_TOKEN,
                expires: 1484314697598,
            },
        });
        return transporter;
    }
}
exports.default = EmailService;
