import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class AdditionalInfoMigration1776255143483 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "additional_information",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "scholarship_application_id",
                        type: "int",
                        isUnique: true,
                    },
                    {
                        name: "content",
                        type: "json",
                    },
                ],
            }),
            true
        );

        await queryRunner.createForeignKey(
            "additional_information",
            new TableForeignKey({
                columnNames: ["scholarship_application_id"],
                referencedTableName: "scholarship_applications",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropTable("additional_information");
    }
}