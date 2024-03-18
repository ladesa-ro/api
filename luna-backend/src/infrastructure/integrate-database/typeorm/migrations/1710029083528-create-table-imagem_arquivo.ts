import { MigrationInterface, QueryRunner, Table } from 'typeorm';

const tableName = 'imagem_arquivo';

export class CreateTableImagemArquivo1710029083528 implements MigrationInterface {
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
            name: 'largura',
            type: 'int',
            isNullable: false,
          },

          {
            name: 'altura',
            type: 'int',
            isNullable: false,
          },

          {
            name: 'formato',
            type: 'text',
            isNullable: false,
          },

          {
            name: 'mime_type',
            type: 'text',
            isNullable: false,
          },

          //

          {
            name: 'id_imagem_fk',
            type: 'uuid',
            isNullable: false,
          },

          {
            name: 'id_arquivo_fk',
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
        ],

        foreignKeys: [
          {
            name: `fk__${tableName}__depende__imagem`,
            columnNames: ['id_imagem_fk'],
            referencedColumnNames: ['id'],
            referencedTableName: 'imagem',
          },
          {
            name: `fk__${tableName}__depende__arquivo`,
            columnNames: ['id_arquivo_fk'],
            referencedColumnNames: ['id'],
            referencedTableName: 'arquivo',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(tableName, true, true, true);
  }
}
