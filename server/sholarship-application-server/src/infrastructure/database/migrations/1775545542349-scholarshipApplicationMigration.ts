import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class ApplicationsTableMigration1775545542349 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "scholarship_applications",
                columns: [
                    {
                        name: "uuid",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "token",
                        type: "varchar",
                        isUnique: true,
                    },
                    {
                        name: "applicant_uuid",
                        type: "varchar",
                    },
                    {
                        name: "information_request_uuid",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "program_uuid",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "advisor_uuid",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "notification_language",
                        type: "enum",
                        enum: ["ENGLISH", "SPANISH"],
                        default: "'ENGLISH'",
                    },
                    {
                        name: "status",
                        type: "enum",
                        enum: ["PENDING", "IN_PROCESS", "FINISHED", "DISABLED", "ARCHIVED"],
                        default: "'PENDING'",
                    },
                    {
                        name: "reminder_sent",
                        type: "boolean",
                        default: false,
                    },
                    {
                        name: "send_date",
                        type: "timestamp",
                        isNullable: true,
                    },
                    {
                        name: "finished_at",
                        type: "timestamp",
                        isNullable: true,
                    },
                    {
                        name: "disabled_at",
                        type: "timestamp",
                        isNullable: true,
                    },
                    {
                        name: "archived_at",
                        type: "timestamp",
                        isNullable: true,
                    },
                    {
                        name: "has_academic_degree",
                        type: "boolean",
                        default: false,
                    },
                    {
                        name: "summary_sent_to_advisor",
                        type: "boolean",
                        default: false,
                    },
                ],
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("scholarship_applications");
    }
}