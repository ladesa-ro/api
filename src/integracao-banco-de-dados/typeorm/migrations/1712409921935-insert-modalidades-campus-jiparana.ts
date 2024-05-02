import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertModalidadesCampusJiparana1712409921935 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO modalidade
        (id, nome, slug, dateCreateOperator()d, dateUpdateOperator()d, date_deleted)
      VALUES ('1f08fe79-8f99-493b-ade1-fe082b4761e1', 'Técnico Integrado ao Ensino Médio', 'tecnico-integrado-em', '2024-02-04T18:00:00.000Z', '2024-02-04T18:00:00.000Z', null);`,
    );
    await queryRunner.query(
      `INSERT INTO modalidade
        (id, nome, slug, dateCreateOperator()d, dateUpdateOperator()d, date_deleted)
      VALUES ('aab71668-9dfc-46ae-8593-99dcb616a88d', 'Técnico Subsequente ao Ensino Médio', 'tecnico-Subsequente-em', '2024-02-04T18:00:00.000Z', '2024-02-04T18:00:00.000Z', null);`,
    );
    await queryRunner.query(
      `INSERT INTO modalidade
        (id, nome, slug, dateCreateOperator()d, dateUpdateOperator()d, date_deleted)
      VALUES ('2fcfc6cb-8f79-44ff-9c06-96a6a955005b', 'Curso superior de tecnologia', 'curso-superior-de-tecnologia-em', '2022-02-04T18:00:00.000Z', '2022-02-04T18:00:00.000Z', null);`,
    );
    await queryRunner.query(
      `INSERT INTO modalidade
        (id, nome, slug, dateCreateOperator()d, dateUpdateOperator()d, date_deleted)
      VALUES ('3ec92df1-1c11-4990-8664-f17fbbd3ca41', 'Licenciatura', 'licenciatura', '2021-02-04T18:00:00.000Z', '2021-02-04T18:00:00.000Z', null);`,
    );
    await queryRunner.query(
      `INSERT INTO modalidade
        (id, nome, slug, dateCreateOperator()d, dateUpdateOperator()d, date_deleted)
      VALUES ('c6079567-5975-4247-b8bc-892eeeeb1451', 'Bacharel', 'bacharel', '2021-02-04T18:00:00.000Z', '2021-02-04T18:00:00.000Z', null);`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM "modalidade" WHERE true;');
  }
}
