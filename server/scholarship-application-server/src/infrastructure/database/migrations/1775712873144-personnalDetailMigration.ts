import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class PersonnalDetailMigration1775712873144 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "personal_details",
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
            "personal_details",
            new TableForeignKey({
                columnNames: ["scholarship_application_id"],
                referencedTableName: "scholarship_applications",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("personal_details");
        const foreignKey = table?.foreignKeys.find(
            fk => fk.columnNames.indexOf("scholarship_application_id") !== -1
        );

        if (foreignKey) {
            await queryRunner.dropForeignKey("personal_details", foreignKey);
        }

        await queryRunner.dropTable("personal_details");
    }
}