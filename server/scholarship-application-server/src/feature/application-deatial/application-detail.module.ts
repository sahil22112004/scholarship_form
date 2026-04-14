import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScholarshipApplication } from '../../domain/entities/scholarship-application.entity';
import { CreatePersonalDetailService } from './create-personal-detail/create-personal-detail.service';
import { CreatePersonalDetailController } from './create-personal-detail/create-personal-detail.controller';
import { PersonalDetail } from '../../domain/entities/personal-detail.entity';
import { CreateAddressDetailController } from './create-address-detail/create-address-detail.controller';
import { CreateAddressDetailService } from './create-address-detail/create-address-detail.service';
import { AddressDetail } from '../../domain/entities/address-detail.entity';



@Module({
    imports: [TypeOrmModule.forFeature([ScholarshipApplication,PersonalDetail,AddressDetail])],
    controllers: [
        CreatePersonalDetailController,
        CreateAddressDetailController
    ],
    providers: [
        CreatePersonalDetailService,
        CreateAddressDetailService 
    ],
})
export class PersonalDetailModule { }