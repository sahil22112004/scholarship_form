import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'

@Entity('inbox')
export class Inbox {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ unique: true })
    eventId: string

    @Column()
    handler: string

    @CreateDateColumn()
    receivedAt: Date

}