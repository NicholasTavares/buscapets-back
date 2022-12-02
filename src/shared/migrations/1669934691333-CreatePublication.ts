import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class CreatePublication1669934691333 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'publications',
        columns: [
          new TableColumn({
            name: 'id',
            type: 'varchar(36)',
            isPrimary: true,
            isUnique: true,
            generationStrategy: 'uuid',
          }),
          new TableColumn({
            name: 'user_id',
            type: 'varchar(36)',
          }),
          new TableColumn({
            name: 'title',
            type: 'varchar',
          }),
          new TableColumn({
            name: 'description',
            type: 'varchar',
          }),
          new TableColumn({
            name: 'pet_name',
            type: 'varchar',
          }),
          new TableColumn({
            name: 'type',
            type: 'varchar',
          }),
          new TableColumn({
            name: 'sex',
            type: 'varchar',
          }),
          new TableColumn({
            name: 'last_location',
            type: 'geometry',
            srid: 4326,
            spatialFeatureType: 'Point',
          }),
          new TableColumn({
            name: 'disappearance_date',
            type: 'datetime',
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

    await queryRunner.createForeignKey(
      'publications',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('publications');
  }
}
