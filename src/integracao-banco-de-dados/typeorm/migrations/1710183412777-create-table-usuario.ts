import { MigrationInterface, QueryRunner, Table } from 'typeorm';

const tableName = 'usuario';

export class CreateTableUsuario1710183412777 implements MigrationInterface {
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
            isNullable: true,
          },

          {
            name: 'matricula_siape',
            type: 'text',
            isNullable: true,
          },

          {
            name: 'email',
            type: 'text',
            isNullable: true,
          },

          //

          {
            name: 'id_imagem_perfil_fk',
            type: 'uuid',
            isNullable: true,
          },

          {
            name: 'id_imagem_capa_fk',
            type: 'uuid',
            isNullable: true,
          },

          //

          {
            name: 'is_super_user',
            type: 'boolean',
            isNullable: false,
            default: 'FALSE',
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
            name: `fk__${tableName}__possui__imagem_perfil`,
            columnNames: ['id_imagem_perfil_fk'],
            referencedColumnNames: ['id'],
            referencedTableName: 'imagem',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
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
    await queryRunner.dropTable(tableName, true, true, true);
  }
}
