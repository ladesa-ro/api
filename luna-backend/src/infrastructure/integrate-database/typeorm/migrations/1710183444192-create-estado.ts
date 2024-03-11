import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateEstado1710183444192 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'base_estado',

        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: false,
          },

          // ...

          {
            name: 'sigla',
            type: 'text',
            isNullable: false,
          },

          {
            name: 'nome',
            type: 'text',
            isNullable: false,
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'base_cidade',

        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: false,
          },

          // ...

          {
            name: 'nome',
            type: 'text',
            isNullable: false,
          },

          // ...

          {
            name: 'id_estado_fk',
            type: 'int',
            isNullable: true,
          },
        ],

        foreignKeys: [
          new TableForeignKey({
            columnNames: ['id_estado_fk'],
            referencedColumnNames: ['id'],
            referencedTableName: 'base_estado',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          }),
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropDatabase('base_cidade', true);
    await queryRunner.dropDatabase('base_estado', true);
  }
}
