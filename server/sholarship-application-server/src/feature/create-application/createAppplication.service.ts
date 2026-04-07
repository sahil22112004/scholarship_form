import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { ScholarshipApplication } from "../../domain/entities/scholarship-application.entity"
import { SendMailService } from "../../infrastructure/node-mailer/sendMail.service"

@Injectable()
export class CreateApplicationService {

  constructor(
    @InjectRepository(ScholarshipApplication)
    private scholarshipApplicationRepository: Repository<ScholarshipApplication>,

     private SendMailService: SendMailService
  ) { }

  async CreateApplication(payload:any){

    console.log("user is",payload)

    const createdApplication = this.scholarshipApplicationRepository.create({
        token:payload.token,
        applicant_uuid:payload.applicant_uuid,
        
    })
    await this.scholarshipApplicationRepository.save(createdApplication)

    await this.SendMailService.sendScholarshipAccessEmail(
      payload.email,
      payload.first_name,
      payload.last_name,
      payload.token

    )

    return {message:"successfully created"}
  }

 }