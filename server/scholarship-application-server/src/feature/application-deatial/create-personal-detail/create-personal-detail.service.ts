import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ScholarshipApplication } from '../../../domain/entities/scholarship-application.entity';
import { Repository } from 'typeorm';
import { PersonalDetail } from 'src/domain/entities/personal-detail.entity';


@Injectable()
export class CreatePersonalDetailService {
    constructor(

        @InjectRepository(ScholarshipApplication)
        private scholarshipApplicationRepository: Repository<ScholarshipApplication>,

        @InjectRepository(PersonalDetail)
        private personalDetailRepository: Repository<PersonalDetail>

    ) { }

    async createPersonalDetail(applicationId: number, content: any) {
        const application = await this.scholarshipApplicationRepository.findOne({ where: { id: applicationId } })
        if (!application) {
            throw new HttpException('Application Not Found', 404)
        }

        const personalDetail = await this.personalDetailRepository.findOne({ where: { scholarship_application_id: applicationId } })

        if (personalDetail) {
            personalDetail.content = content
            await this.personalDetailRepository.save(personalDetail)
            return { message: 'Personal Detail Saved', persnolDetailData: personalDetail }
        }

        const createdPersonalDetail = this.personalDetailRepository.create({
            scholarship_application_id: applicationId,
            content: content
        })

        const savedPersonalDetail = await this.personalDetailRepository.save(createdPersonalDetail)

        return { message: 'Personal Detail Saved', persnolDetailData: savedPersonalDetail }

    }
}