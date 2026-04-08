import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { loginApplicantService } from './login.service';
import type { Response } from 'express';


@Controller('applicant')
export class RegisterApplicantController {
  constructor(private readonly loginApplicantService: loginApplicantService) { }

  @Post('login')
  async loginApplicant(@Body() body: { token: string }, @Res({ passthrough: true }) res: Response) {
    const response = await this.loginApplicantService.loginApplicant(body.token);
    if (response.access_token) {
      res.cookie('access_token', response.access_token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60,
      });
    }
    return response
  }
}