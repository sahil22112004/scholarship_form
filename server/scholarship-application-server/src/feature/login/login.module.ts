import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScholarshipApplication } from '../../domain/entities/scholarship-application.entity';
import { RegisterApplicantController } from './login.controller';
import { loginApplicantService } from './login.service';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';



@Module({
    imports: [
        TypeOrmModule.forFeature([ScholarshipApplication]),
        HttpModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'secret',
        }),],
    controllers: [RegisterApplicantController],
    providers: [loginApplicantService],
})
export class loginModule { }