import { MigrationInterface, QueryRunner } from 'typeorm';

export class discoTimeToDate1618077781658 implements MigrationInterface {
	name = 'discoTimeToDate1618077781658';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "disco" DROP COLUMN "bootUp"`);
		await queryRunner.query(`ALTER TABLE "disco" ADD "bootUp" TIMESTAMP NOT NULL`);
		await queryRunner.query(`ALTER TABLE "disco" DROP COLUMN "shutdown"`);
		await queryRunner.query(`ALTER TABLE "disco" ADD "shutdown" TIMESTAMP NOT NULL`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "disco" DROP COLUMN "shutdown"`);
		await queryRunner.query(`ALTER TABLE "disco" ADD "shutdown" TIME NOT NULL`);
		await queryRunner.query(`ALTER TABLE "disco" DROP COLUMN "bootUp"`);
		await queryRunner.query(`ALTER TABLE "disco" ADD "bootUp" TIME NOT NULL`);
	}
}
