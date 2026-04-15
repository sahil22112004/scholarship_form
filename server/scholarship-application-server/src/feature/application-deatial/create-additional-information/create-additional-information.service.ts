import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ScholarshipApplication } from '../../../domain/entities/scholarship-application.entity';
import { Repository } from 'typeorm';
import { AdditionalInformation } from '../../../domain/entities/additional-information.entity';


@Injectable()
export class CreateAdditionalInformationService {
    constructor(

        @InjectRepository(ScholarshipApplication)
        private scholarshipApplicationRepository: Repository<ScholarshipApplication>,

        @InjectRepository(AdditionalInformation)
        private additionalInformationRepository: Repository<AdditionalInformation>

    ) { }

    async createAdditionalInformation(applicationId: number, content: any) {
        const application = await this.scholarshipApplicationRepository.findOne({ where: { id: applicationId } })
        if (!application) {
            throw new HttpException('Application Not Found', 404)
        }

        const additionalInformation = await this.additionalInformationRepository.findOne({ where: { scholarship_application_id: applicationId } })

        if (additionalInformation) {

            console.log("comming in this",content)
            additionalInformation.content = content
            console.log("address is",additionalInformation)
            await this.additionalInformationRepository.save(additionalInformation)
            return { message: 'Personal Detail Saved', persnolDetailData: additionalInformation }
        }

        const createdPersonalDetail = this.additionalInformationRepository.create({
            scholarship_application_id: applicationId,
            content: content
        })

        const savedAdditionalInformation = await this.additionalInformationRepository.save(createdPersonalDetail)

        return { message: 'Additional Information Saved', persnolDetailData: savedAdditionalInformation }

    }
}