import { MigrationInterface, QueryRunner, Table } from 'typeorm';

const tableName = 'disciplina';

export class CreateTableDisciplina1710184490462 implements MigrationInterface {
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
            name: 'nome_abreviado',
            type: 'text',
            isNullable: false,
          },

          {
            name: 'carga_horaria',
            type: 'int',
            isNullable: false,
          },
          //

          {
            name: 'id_imagem_capa_fk',
            type: 'uuid',
            isNullable: true,
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
            name: `fk__${tableName}__possui__imagem_capa`,
            columnNames: ['id_imagem_capa_fk'],
            referencedColumnNames: ['id'],
            referencedTableName: 'imagem',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
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
