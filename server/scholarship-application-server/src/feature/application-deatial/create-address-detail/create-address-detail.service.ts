import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ScholarshipApplication } from '../../../domain/entities/scholarship-application.entity';
import { Repository } from 'typeorm';
import { AddressDetail } from '../../../domain/entities/address-detail.entity';


@Injectable()
export class CreateAddressDetailService {
    constructor(

        @InjectRepository(ScholarshipApplication)
        private scholarshipApplicationRepository: Repository<ScholarshipApplication>,

        @InjectRepository(AddressDetail)
        private addressDetailRepository: Repository<AddressDetail>

    ) { }

    async createAddressDetail(applicationId: number, content: any) {
        const application = await this.scholarshipApplicationRepository.findOne({ where: { id: applicationId } })
        if (!application) {
            throw new HttpException('Application Not Found', 404)
        }

        const addressDetail = await this.addressDetailRepository.findOne({ where: { scholarship_application_id: applicationId } })

        if (addressDetail) {

            console.log("comming in this",content)
            addressDetail.content = content
            console.log("address is",addressDetail)
            await this.addressDetailRepository.save(addressDetail)
            return { message: 'Personal Detail Saved', persnolDetailData: addressDetail }
        }

        const createdPersonalDetail = this.addressDetailRepository.create({
            scholarship_application_id: applicationId,
            content: content
        })

        const savedAddressDetail = await this.addressDetailRepository.save(createdPersonalDetail)

        return { message: 'Personal Detail Saved', persnolDetailData: savedAddressDetail }

    }
}