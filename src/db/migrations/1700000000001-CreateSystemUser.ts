import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSystemUser1700000000001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "SYSTEM_USER" (
        "id" SERIAL NOT NULL,
        "name" character varying NOT NULL,
        "email" character varying NOT NULL,
        "password" character varying NOT NULL,
        "isNotificationEnabled" boolean NOT NULL DEFAULT true,
        CONSTRAINT "UQ_SYSTEM_USER_email" UNIQUE ("email"),
        CONSTRAINT "PK_SYSTEM_USER_id" PRIMARY KEY ("id")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "SYSTEM_USER"`);
  }
}
