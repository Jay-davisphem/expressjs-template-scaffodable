import nodemailer from 'nodemailer'
import EnvVars from '../config'

const htmlContent = (title: string, message: string, url: string, securityCode: string) => `
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
    <p>${message}. <a href="${url??''}" title="Click link">Click Here</a></p>
  </div>
</body>
</html>
`;

export default class EmailService {
    htmlContent: string;
    message: string;
    email: string;
    title: string;
    subject: string;
    to: string
    securityCode: string;
    constructor(subject: string, title: string, message: string, to: string, securityCode: string, url?: string){
        this.subject = subject
        this.email = EnvVars.ADMIN_MAIL
        this.title = title
        this.message = message
        this.to = to
        this.securityCode = securityCode
        this.htmlContent = this.getHtmlContent(subject, title, message, url)
    }

    private getHtmlContent = (subject: string, title: string, message: string, url?: string) => {
        return htmlContent(title, message, url as string, this.securityCode)
    }

    private get transporter(): nodemailer.Transporter {
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
              type: "OAuth2",
              clientId: EnvVars.OAUTH_CLIENT_ID,
              clientSecret: EnvVars.OAUTH_CLIENT_SECRET,
              user: EnvVars.ADMIN_MAIL,
              refreshToken: EnvVars.GOOGLE_REFRESH_TOKEN,
              accessToken: EnvVars.GOOGLE_ACCESS_TOKEN,
              expires: 1484314697598,
            },
          });
        return transporter
    }

    sendEmail = async () => {
      let val = ''
      this.transporter.sendMail({
        from: this.email,
            to: this.to,
            subject: this.subject,
            html: this.htmlContent,
        }).catch(res => {
          val = 'error'
          return 'Error'
        })
        if (val == 'error') throw new Error('Email Error')
        return 'Message Sent'
    }
}