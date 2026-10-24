import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPhotoUrlToWaterReport1700000000003
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "WATER_REPORT"
      ADD COLUMN IF NOT EXISTS "photoUrl" character varying,
      ADD COLUMN IF NOT EXISTS "repairPhotoUrl" character varying
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "WATER_REPORT"
      DROP COLUMN IF EXISTS "photoUrl",
      DROP COLUMN IF EXISTS "repairPhotoUrl"
    `);
  }
}
