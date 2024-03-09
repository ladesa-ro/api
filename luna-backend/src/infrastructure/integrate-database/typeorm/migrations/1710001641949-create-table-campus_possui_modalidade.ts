import { MigrationInterface, QueryRunner, Table } from 'typeorm';

const tableName = 'campus_possui_modalidade';

export class CreateTableDisponibilidadeProfessorDia1709946143205 implements MigrationInterface {
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
            name: 'id_campus_fk',
            type: 'uuid',
            isNullable: false,
          },
          //
          {
            name: 'id_modalidade_fk',
            type: 'uuid',
            isNullable: false,
          },
          //
        ],
        foreignKeys: [
          {
            name: `fk__${tableName}__depende__campus`,
            columnNames: ['id_campus_fk'],
            referencedColumnNames: ['id'],
            referencedTableName: 'campus',
          },
          {
            name: `fk__${tableName}__depende__modalidade`,
            columnNames: ['id_modalidade_fk'],
            referencedColumnNames: ['id'],
            referencedTableName: 'modalidade',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(tableName, true, true, true);
  }
}
