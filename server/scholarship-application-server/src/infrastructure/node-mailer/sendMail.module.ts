
import { Module } from '@nestjs/common'
import { MailerModule } from '@nestjs-modules/mailer'
import { SendMailService } from './sendMail.service'
import { config } from "dotenv";

config()

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      },
    }),
  ],
  providers: [SendMailService],
  exports: [SendMailService],
})
export class SendMailModule {}