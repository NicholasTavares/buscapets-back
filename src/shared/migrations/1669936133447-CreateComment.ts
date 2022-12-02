import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class CreateComment1669936133447 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'comments',
        columns: [
          new TableColumn({
            name: 'id',
            type: 'varchar(36)',
            isPrimary: true,
            isUnique: true,
            generationStrategy: 'uuid',
          }),
          new TableColumn({
            name: 'comment',
            type: 'varchar',
          }),
          new TableColumn({
            name: 'user_id',
            type: 'varchar(36)',
          }),
          new TableColumn({
            name: 'publication_id',
            type: 'varchar(36)',
          }),
          new TableColumn({
            name: 'created_at',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
          }),
          new TableColumn({
            name: 'updated_at',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
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

    await queryRunner.createForeignKey(
      'comments',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'comments',
      new TableForeignKey({
        columnNames: ['publication_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'publications',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('comments');
  }
}
