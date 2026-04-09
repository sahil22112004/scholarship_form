import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { ScholarshipApplication } from './scholarship-application.entity';

@Entity('personal_details')
export class PersonalDetail {
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