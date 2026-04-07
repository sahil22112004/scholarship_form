import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Applicant } from '../../domain/entities/applicant.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class getApplicantService {
    constructor(
        private dataSource: DataSource,

        @InjectRepository(Applicant)
        private applicantRepository: Repository<Applicant>,
    ) {}


    async getApplicant(uuid:string) {

        const applicant = await this.applicantRepository.findOne({where:{uuid}})

        if (!applicant){
            throw new HttpException('Applicant Not Found',404)
        }
        return {message:'Applicant Fetch Successfully', applicant}
        
    }
}