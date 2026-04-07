import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export enum NotificationLanguage {
    ENGLISH = 'ENGLISH',
    SPANISH = 'SPANISH'
}

export enum Status {
    PENDING = 'PENDING',
    IN_PROCESS = 'IN_PROCESS',
    FINISHED = 'FINISHED',
    DISABLED = 'DISABLED',
    ARCHIVED = 'ARCHIVED'
}


@Entity('scholarship_applications')
export class ScholarshipApplication{
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({ unique: true })
    token: string;

    @Column()
    applicant_uuid: string;

    @Column()
    information_request_uuid: string;

    @Column()
    program_uuid: string;

    @Column()
    advisor_uuid: string;

    @Column({
        type: 'enum',
        enum: NotificationLanguage,
        default: NotificationLanguage.ENGLISH
    })
    notification_language: NotificationLanguage;

    @Column({
        type: 'enum',
        enum: Status,
        default: Status.PENDING
    })
    status: Status;

    @Column({default:false})
    reminder_sent: boolean;

    @Column()
    send_date: Date;

    @Column()
    finished_at: Date;

    @Column()
    disabled_at: Date;

    @Column({default:false})
    has_academic_degree: boolean;

    @Column()
    archived_at: Date

    @Column({default:false})
    summary_sent_to_advisor: boolean

}