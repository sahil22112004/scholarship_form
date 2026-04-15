import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { ScholarshipApplication } from './scholarship-application.entity';

@Entity('additional_information')
export class AdditionalInformation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    scholarship_application_id: number;

    @OneToOne(() => ScholarshipApplication)
    @JoinColumn({ name: 'scholarship_application_id' })
    scholarshipApplication: ScholarshipApplication;

    @Column({ type: 'json' })
    content: any;
}