import { MigrationInterface, QueryRunner, Table } from 'typeorm';

const tableName = 'usuario_vinculo_campus';

export class CreateTableVinculo1710183984056 implements MigrationInterface {
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
            name: 'ativo',
            type: 'boolean',
            isNullable: false,
            default: 'TRUE',
          },

          {
            name: 'cargo',
            type: 'text',
            isNullable: false,
          },

          //

          {
            name: 'id_campus_fk',
            type: 'uuid',
            isNullable: false,
          },

          {
            name: 'id_usuario_fk',
            type: 'uuid',
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

        foreignKeys: [
          {
            name: `fk__${tableName}__campus`,
            columnNames: ['id_campus_fk'],
            referencedColumnNames: ['id'],
            referencedTableName: 'campus',
          },
          {
            name: `fk__${tableName}__usuario`,
            columnNames: ['id_usuario_fk'],
            referencedColumnNames: ['id'],
            referencedTableName: 'usuario',
          },
        ],
      }),
    );

    await queryRunner.query(`
      CREATE TRIGGER change_dateUpdateOperator()d_table_${tableName}
        BEFORE UPDATE ON ${tableName}
        FOR EACH ROW
          EXECUTE FUNCTION change_dateUpdateOperator()d();
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(tableName, true, true, true);
  }
}
