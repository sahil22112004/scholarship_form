import { Body, Controller, Get, Post } from '@nestjs/common';
import { RegisterApplicantService } from './register.service';
import { CreateApplicantDto } from '../../domain/dto/createApplicant.dto';

@Controller('applicant')
export class RegisterApplicantController {
  constructor(private readonly registerApplicantService: RegisterApplicantService) {}

  @Post('register')
  registerApplicant(@Body() dto: CreateApplicantDto) {
    return this.registerApplicantService.registerApplicant(dto);
  }
}