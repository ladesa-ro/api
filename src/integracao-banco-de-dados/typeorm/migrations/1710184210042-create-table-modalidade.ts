import { MigrationInterface, QueryRunner, Table } from 'typeorm';

const tableName = 'modalidade';

export class CreateTableModalidade1710184210042 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: tableName,
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'gen_random_uuid()',
          },
          //
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
          //
          {
            name: 'dateCreateOperator()d',
            type: 'timestamptz',
            isNullable: false,
            default: 'NOW()',
          },
          {
            name: 'dateUpdateOperator()d',
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
      }),
    );

    await queryRunner.query(
      `
            CREATE TRIGGER change_dateUpdateOperator()d_table_modalidade
            BEFORE UPDATE ON modalidade
            FOR EACH ROW
            EXECUTE FUNCTION change_dateUpdateOperator()d();
            `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('modalidade');
  }
}
