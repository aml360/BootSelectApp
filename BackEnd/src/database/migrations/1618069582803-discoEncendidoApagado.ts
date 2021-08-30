import { MigrationInterface, QueryRunner } from 'typeorm';

export class discoEncendidoApagado1618069582803 implements MigrationInterface {
	name = 'discoEncendidoApagado1618069582803';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "disco" DROP COLUMN "active"`);
		await queryRunner.query(`ALTER TABLE "disco" DROP COLUMN "created_at"`);
		await queryRunner.query(`ALTER TABLE "disco" DROP COLUMN "updated_at"`);
		await queryRunner.query(`ALTER TABLE "disco" ADD "bootUp" TIME NOT NULL`);
		await queryRunner.query(`ALTER TABLE "disco" ADD "shutdown" TIME NOT NULL`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "disco" DROP COLUMN "shutdown"`);
		await queryRunner.query(`ALTER TABLE "disco" DROP COLUMN "bootUp"`);
		await queryRunner.query(`ALTER TABLE "disco" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
		await queryRunner.query(`ALTER TABLE "disco" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
		await queryRunner.query(`ALTER TABLE "disco" ADD "active" boolean NOT NULL DEFAULT false`);
	}
}
