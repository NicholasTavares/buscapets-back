import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm';

export class CreateUser1669845315375 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          new TableColumn({
            name: 'id',
            type: 'varchar(36)',
            isPrimary: true,
            isUnique: true,
            generationStrategy: 'uuid',
          }),
          new TableColumn({
            name: 'name',
            type: 'varchar',
          }),
          new TableColumn({
            name: 'email',
            type: 'varchar',
            isUnique: true,
          }),
          new TableColumn({
            name: 'password',
            type: 'varchar',
            isUnique: true,
          }),
          new TableColumn({
            name: 'phone',
            type: 'varchar',
          }),
          new TableColumn({
            name: 'role',
            type: 'varchar',
            default: 'user',
          }),
          new TableColumn({
            name: 'user_picture',
            type: 'varchar',
            isNullable: true,
          }),
          new TableColumn({
            name: 'created_at',
            type: 'datetime',
            default: 'NOW()',
          }),
          new TableColumn({
            name: 'updated_at',
            type: 'datetime',
            default: 'NOW()',
          }),
          new TableColumn({
            name: 'deleted_at',
            type: 'datetime',
            isNullable: true,
          }),
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
