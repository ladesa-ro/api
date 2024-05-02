import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProcedureChangeDateUpdated1710003412077 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE OR REPLACE FUNCTION change_dateUpdateOperator()d() RETURNS TRIGGER
      AS
      $BODY$
      BEGIN
        new.dateUpdateOperator()d := now();
        RETURN new;
      END;
      $BODY$
      LANGUAGE plpgsql;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP FUNCTION IF EXISTS change_dateUpdateOperator()d;
    `);
  }
}
