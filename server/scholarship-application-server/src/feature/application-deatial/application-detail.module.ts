import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScholarshipApplication } from '../../domain/entities/scholarship-application.entity';
import { CreatePersonalDetailService } from './create-personal-detail/create-personal-detail.service';
import { CreatePersonalDetailController } from './create-personal-detail/create-personal-detail.controller';
import { PersonalDetail } from '../../domain/entities/personal-detail.entity';



@Module({
    imports: [TypeOrmModule.forFeature([ScholarshipApplication,PersonalDetail])],
    controllers: [CreatePersonalDetailController],
    providers: [CreatePersonalDetailService],
})
export class PersonalDetailModule { }