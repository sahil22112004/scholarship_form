import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class ApplicantMigration1775545198727 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> { await queryRunner.createTable(
            new Table({
                name: "applicants",
                columns: [
                    {
                        name: "uuid",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "email",
                        type: "varchar",
                        isNullable: false,
                        isUnique: true
                    },
                    {
                        name: "first_name",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "last_name",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "headquater_abbreviation",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "legacy_office_id",
                        type: "varchar",
                        isNullable: false,
                    },
                ]
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("applicants");
    }

}