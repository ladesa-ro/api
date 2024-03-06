import { MigrationInterface, QueryRunner, Table } from "typeorm";

const tableName = "modalidade";
export class CreateTableModalidade1709647646260 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table(
            {
                name: tableName,
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        default: 'gen_random_uuid()',
                    },

                    {
                        name: 'nome',
                        type: 'text',
                        isNullable: false,
                    },
                    {
                        name: 'slug',
                        type: 'text',
                        isNullable: false,
                    },

                    {
                        name: 'id_campus_fk',
                        type: 'uuid',
                    },

                    {
                        name: 'date_created',
                        type: 'timestamptz',
                        isNullable: false,
                        default: 'NOW()',
                    },
                    {
                        name: 'date_updated',
                        type: 'timestamptz',
                        isNullable: false,
                        default: 'NOW()',
                    },
                    {
                        name: 'date_deleted',
                        type: 'timestamptz',
                        isNullable: true,
                    },
                ],
                foreignKeys: [
                    {
                        name: `fk__${tableName}__pertence_a__campus`,
                        columnNames: ["id_campus_fk"],
                        referencedColumnNames: ["id"],
                        referencedTableName: "campus"
                    }
                ]
            }
        ));

        await queryRunner.query(
            `
            CREATE TRIGGER change_date_updated_table_modalidade
            BEFORE UPDATE ON modalidade
            FOR EACH ROW
            EXECUTE FUNCTION change_date_updated();
            `
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("modalidade")
    }

}
