import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableEndereco1707582876864 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'endereco',

        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'gen_random_uuid()',
          },
          //

          {
            name: 'cep',
            type: 'text',
            isNullable: false,
          },

          {
            name: 'logradouro',
            type: 'text',
            isNullable: false,
          },

          {
            name: 'numero',
            type: 'int',
            isNullable: false,
          },

          {
            name: 'bairro',
            type: 'text',
            isNullable: false,
          },

          {
            name: 'complemento',
            type: 'text',
            isNullable: true,
          },

          {
            name: 'ponto_referencia',
            type: 'text',
            isNullable: true,
          },

          {
            name: 'id_cidade_fk',
            type: 'int',
          },

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
      }),
    );

    await queryRunner.query(`
      CREATE TRIGGER change_date_updated_table_endereco
        BEFORE UPDATE ON endereco
        FOR EACH ROW
          EXECUTE FUNCTION change_date_updated();
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('endereco', true, true, true);
  }
}
