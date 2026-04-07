import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { getApplicantService } from './getApplicant.service';
import { CreateApplicantDto } from '../../domain/dto/createApplicant.dto';

@Controller('applicant')
export class GetApplicantController {
  constructor(private readonly getApplicantService: getApplicantService) {}

  @Get(':uuid')
  getApplicant(@Param("uuid") uuid: string) {
    return this.getApplicantService.getApplicant(uuid);
  }
}