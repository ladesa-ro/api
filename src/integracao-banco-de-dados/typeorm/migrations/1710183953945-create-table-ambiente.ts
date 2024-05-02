import { MigrationInterface, QueryRunner, Table } from 'typeorm';

const tableName = 'ambiente';

export class CreateTableAmbiente1710183953945 implements MigrationInterface {
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
            name: 'descricao',
            type: 'text',
            isNullable: false,
          },

          {
            name: 'codigo',
            type: 'text',
            isNullable: false,
          },

          {
            name: 'capacidade',
            type: 'int',
            isNullable: true,
          },

          {
            name: 'tipo',
            type: 'text',
            isNullable: true,
          },

          //

          {
            name: 'id_bloco_fk',
            type: 'uuid',
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
            name: `fk__${tableName}__pertence_a__bloco`,
            columnNames: ['id_bloco_fk'],
            referencedColumnNames: ['id'],
            referencedTableName: 'bloco',
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
      CREATE TRIGGER change_dateUpdateOperator()d_table_${tableName}
        BEFORE UPDATE ON ${tableName}
        FOR EACH ROW
          EXECUTE FUNCTION change_dateUpdateOperator()d();
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(`${tableName}`, true, true, true);
  }
}
