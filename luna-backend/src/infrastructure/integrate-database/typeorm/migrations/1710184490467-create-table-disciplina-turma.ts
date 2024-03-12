import { MigrationInterface, QueryRunner, Table } from 'typeorm';

const tableName = 'disciplina_turma';

export class CreateTableDisciplinaTurma1710184490467 implements MigrationInterface {
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
            name: 'id_disciplina_fk',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'id_turma_fk',
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
            name: `fk__${tableName}__depende__disciplina`,
            columnNames: ['id_disciplina_fk'],
            referencedColumnNames: ['id'],
            referencedTableName: 'disciplina',
          },
          {
            name: `fk__${tableName}__depende__turma`,
            columnNames: ['id_turma_fk'],
            referencedColumnNames: ['id'],
            referencedTableName: 'turma',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(tableName, true, true, true);
  }
}
