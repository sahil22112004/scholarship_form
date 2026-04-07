import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GetApplicantController } from './get-applicant/getApplicant.controller';
import { RegisterApplicantController } from './register/register.controller';
import { RegisterApplicantService } from './register/register.service';
import { getApplicantService } from './get-applicant/getApplicant.service';
import { Applicant } from '../domain/entities/applicant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Applicant])],
  controllers: [RegisterApplicantController,GetApplicantController],
  providers: [RegisterApplicantService,getApplicantService],
})
export class authModule {}