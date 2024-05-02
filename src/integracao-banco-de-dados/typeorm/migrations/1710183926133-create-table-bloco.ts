import { MigrationInterface, QueryRunner, Table } from 'typeorm';

const tableName = 'bloco';

export class CreateTableBloco1710183926133 implements MigrationInterface {
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
            name: 'codigo',
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
            name: `fk__${tableName}__pertence_a__campus`,
            columnNames: ['id_campus_fk'],
            referencedColumnNames: ['id'],
            referencedTableName: 'campus',
          },

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
      CREATE TRIGGER change_dateUpdateOperator()d_table_bloco
        BEFORE UPDATE ON bloco
        FOR EACH ROW
          EXECUTE FUNCTION change_dateUpdateOperator()d();
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('bloco', true, true, true);
  }
}
