import { MigrationInterface, QueryRunner } from 'typeorm';

export class claseYordenadores1617647913053 implements MigrationInterface {
	name = 'claseYordenadores1617647913053';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "clase" ("id" character varying(10) NOT NULL, "name" character varying(20) NOT NULL, "description" text NOT NULL, "status" character varying(8) NOT NULL DEFAULT 'ACTIVE', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9a493a2bbf7d40e3738abcedc31" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE TABLE "ordenador" ("id" character varying(10) NOT NULL, "ip" character varying(20) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ee86b2a8d87afee3b0765dc22d6" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE TABLE "disco" ("id" BIGSERIAL NOT NULL, "description" text, "active" boolean NOT NULL DEFAULT 'false', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "ordenadorId" character varying(10), CONSTRAINT "PK_2373492e887ad07510d3e00693d" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`ALTER TABLE "disco" ADD CONSTRAINT "FK_65f21b8c31f84b6223ca3b24136" FOREIGN KEY ("ordenadorId") REFERENCES "ordenador"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "disco" DROP CONSTRAINT "FK_65f21b8c31f84b6223ca3b24136"`);
		await queryRunner.query(`DROP TABLE "disco"`);
		await queryRunner.query(`DROP TABLE "ordenador"`);
		await queryRunner.query(`DROP TABLE "clase"`);
	}
}
