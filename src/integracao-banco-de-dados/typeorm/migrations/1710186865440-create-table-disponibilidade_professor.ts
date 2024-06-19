import { MigrationInterface, QueryRunner, Table } from 'typeorm';

const tableName = 'disponibilidade_professor';

export class CreateTableDisponibilidadeProfessor1710186865440 implements MigrationInterface {
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
            name: 'data_inicio',
            type: 'date',
            isNullable: false,
          },
          {
            name: 'data_fim',
            type: 'date',
            isNullable: true,
          },
          //
          {
            name: 'id_vinculo_professor_fk',
            type: 'uuid',
            isNullable: false,
          },
          //
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
            name: `fk__${tableName}__depende__usuario_vinculo_campus`,
            columnNames: ['id_vinculo_professor_fk'],
            referencedColumnNames: ['id'],
            referencedTableName: 'usuario_vinculo_campus',
          },
        ],
      }),
    );

    await queryRunner.query(`
      CREATE TRIGGER change_date_updated_table_${tableName}
        BEFORE UPDATE ON ${tableName}
        FOR EACH ROW
          EXECUTE FUNCTION change_date_updated();
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(tableName, true, true, true);
  }
}
