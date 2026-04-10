import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ScholarshipApplication } from '../../domain/entities/scholarship-application.entity';
import { DataSource, Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class loginApplicantService {
    constructor(
        private dataSource: DataSource,
        @InjectRepository(ScholarshipApplication)
        private scholarshipApplicationRepository: Repository<ScholarshipApplication>,
        private readonly httpService: HttpService,
        private readonly jwtService: JwtService,
    ) { }

    async loginApplicant(token: string) {
        const applicationForm = await this.scholarshipApplicationRepository.findOne({
            where: { token },
            relations: ['personalDetail'],
        });

        if (!applicationForm) {
            throw new HttpException('Application Not Fouund', 404);
        }

        const applicantUuid = applicationForm.applicant_uuid;

        const response: any = await firstValueFrom(
            this.httpService.get(`http://localhost:4000/applicant/${applicantUuid}`)
        );

        const applicantData = response.data.applicant;
        const access_token = await this.jwtService.signAsync(applicantData);

        const { personalDetail, ...applicationWithoutPersonal } = applicationForm;

        return {
            message: 'Application Fetch Successfully',
            applicationForm: applicationWithoutPersonal,
            personalDetail: personalDetail?.content || null,
            applicant: applicantData,
            access_token
        };
    }
}