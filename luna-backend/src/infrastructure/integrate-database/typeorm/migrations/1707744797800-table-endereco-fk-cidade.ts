import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class TableEnderecoFkCidade1707744797800 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'endereco',
      new TableForeignKey({
        name: 'fk_endereco_tem_cidade',
        columnNames: ['id_cidade_fk'],
        referencedColumnNames: ['id'],
        referencedTableName: 'base_cidade',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('endereco', 'fk_endereco_tem_cidade');
  }
}
