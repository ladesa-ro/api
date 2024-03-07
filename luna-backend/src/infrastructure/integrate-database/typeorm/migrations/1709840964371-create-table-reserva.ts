import { MigrationInterface, QueryRunner, Table } from 'typeorm';

const tableName = 'reserva';

export class CreateTableReserva1709840964371 implements MigrationInterface {
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
            name: 'situacao',
            type: 'text',
            isNullable: false,
          },

          {
            name: 'motivo',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'tipo',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'data_inicio',
            type: 'timestamptz',
            isNullable: false,
          },
          {
            name: 'data_termino',
            type: 'timestamptz',
            isNullable: true,
          },
          {
            name: 'id_ambiente_fk',
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
            name: `fk__${tableName}__depende__ambiente`,
            columnNames: ['id_ambiente_fk'],
            referencedColumnNames: ['id'],
            referencedTableName: 'campus_bloco_ambiente',
          },
          {
            name: `fk__${tableName}__depende__usuario`,
            columnNames: ['id_usuario_fk'],
            referencedColumnNames: ['id'],
            referencedTableName: 'usuario',
          },
        ]
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
