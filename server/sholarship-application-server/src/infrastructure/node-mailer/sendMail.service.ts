import { Injectable } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'

@Injectable()
export class SendMailService {
    constructor(private readonly mailerService: MailerService) {}

    async sendScholarshipAccessEmail(
        email: string,
        first_name: string,
        last_name: string,
        code: string,
        program_name: string = "education scholarship",
        access_link: string = "https://www.google.com",
    ) {
        await this.mailerService.sendMail({
            to: email,
            subject: 'Access your scholarship application form Version2',
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto;">
                    
                    <p style="font-size: 12px; color: #666;">
                        11/20/24, 11:10 AM
                    </p>

                    <h2 style="text-align: center; color: #2c3e50;">
                        Access Code
                    </h2>

                    <p>
                        Access the scholarship application form for the program 
                        <strong>"${program_name}"</strong>
                    </p>

                    <p>
                        Dear <strong>${first_name} ${last_name}</strong>,
                    </p>

                    <p>
                        To return to the online scholarship application form for the program 
                        <strong>"${program_name}"</strong>, please use the following link:
                    </p>

                    <p>
                        <a href="${access_link}" style="color: #1a73e8;">
                            ${access_link}
                        </a>
                    </p>

                    <p>
                        Copy and paste the following code to access:
                    </p>

                    <table style="border-collapse: collapse; margin: 20px 0;">
                        <tr>
                            <td style="border: 1px solid #000; padding: 10px;">
                                Access Code:
                            </td>
                            <td style="border: 1px solid #000; padding: 10px; font-size: 18px; letter-spacing: 2px;">
                                ${code}
                            </td>
                        </tr>
                    </table>

                    <p>
                        We remain at your disposal.
                    </p>

                    <p>
                        Kind regards,<br/>
                        Admissions Department
                    </p>

                </div>
            `,
        })
    }
}