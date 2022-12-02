import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class CreatePublicationPicture1669936859151
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'publication_pictures',
        columns: [
          new TableColumn({
            name: 'id',
            type: 'varchar(36)',
            isPrimary: true,
            isUnique: true,
            generationStrategy: 'uuid',
          }),
          new TableColumn({
            name: 'publication_picture',
            type: 'varchar',
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
      'publication_pictures',
      new TableForeignKey({
        columnNames: ['publication_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'publications',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('publication_pictures');
  }
}
