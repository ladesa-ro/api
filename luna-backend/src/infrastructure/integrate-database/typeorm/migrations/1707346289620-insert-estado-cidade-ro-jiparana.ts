import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertEstadoCidadeRoJiparana1707346289620 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO base_estado ("id", "sigla", "nome") VALUES
        (11, 'RO', 'Rondônia');
    `);

    await queryRunner.query(`
      INSERT INTO base_cidade ("id", "id_estado_fk", "nome") VALUES
          (1100015, 11, 'Ji-Paraná');
  `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM base_cidade WHERE 'id' = 1100015;`);
    await queryRunner.query(`DELETE FROM base_estado WHERE 'id' = 11;`);
  }
}
