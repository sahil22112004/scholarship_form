import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateApplicantDto } from '../../domain/dto/createApplicant.dto';
import { Applicant } from '../../domain/entities/applicant.entity';
import { DataSource, Repository } from 'typeorm';
import { Outbox } from 'src/domain/entities/outbox.entity';

@Injectable()
export class RegisterApplicantService {
    constructor(
        private dataSource: DataSource,
    ) {}

    private generateToken(length: number): string {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let token = '';
        for (let i = 0; i < length; i++) {
            token += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return token;
    }

    async registerApplicant(dto: CreateApplicantDto) {
        const { first_name, last_name, email, headquater_abbreviation, legacy_office_id } = dto;

        return await this.dataSource.transaction(async (manager) => {
            try {
                const applicant = manager.create(Applicant, {
                    first_name,
                    last_name,
                    email,
                    headquater_abbreviation,
                    legacy_office_id,
                });

                const savedApplicant = await manager.save(Applicant, applicant);

                const token = this.generateToken(6);

                const Payload = {
                    token,
                    applicant_uuid: savedApplicant.uuid,
                    email,
                    first_name,
                    last_name

                };

                const outbox = manager.create(Outbox, {Payload});

                await manager.save(Outbox, outbox);

                return {
                    message: 'Applicant registered successfully',
                    applicant: savedApplicant,
                };

            } catch (error) {
                console.log(error)
                throw new HttpException('Transaction failed', 500);
            }
        });
    }
}