import { MigrationInterface, QueryRunner } from 'typeorm';

export class classPCUser1617659174673 implements MigrationInterface {
	name = 'classPCUser1617659174673';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "clase_profesores_user" ("claseId" character varying(10) NOT NULL, "userUsername" character varying(40) NOT NULL, CONSTRAINT "PK_e6a8b4ab93bca8fcb995f52d3c2" PRIMARY KEY ("claseId", "userUsername"))`,
		);
		await queryRunner.query(`CREATE INDEX "IDX_95eb8b231d10b42635c7c56298" ON "clase_profesores_user" ("claseId") `);
		await queryRunner.query(
			`CREATE INDEX "IDX_f32cdcf41cd148b01194e5dbbe" ON "clase_profesores_user" ("userUsername") `,
		);
		await queryRunner.query(`ALTER TABLE "clase" DROP COLUMN "status"`);
		await queryRunner.query(`ALTER TABLE "ordenador" ADD "claseId" character varying(10)`);
		await queryRunner.query(`ALTER TABLE "disco" ALTER COLUMN "active" SET DEFAULT 'false'`);
		await queryRunner.query(
			`ALTER TABLE "ordenador" ADD CONSTRAINT "FK_c934f8f9d63db08427e187d91c4" FOREIGN KEY ("claseId") REFERENCES "clase"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "clase_profesores_user" ADD CONSTRAINT "FK_95eb8b231d10b42635c7c562980" FOREIGN KEY ("claseId") REFERENCES "clase"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "clase_profesores_user" ADD CONSTRAINT "FK_f32cdcf41cd148b01194e5dbbee" FOREIGN KEY ("userUsername") REFERENCES "user"("username") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "clase_profesores_user" DROP CONSTRAINT "FK_f32cdcf41cd148b01194e5dbbee"`);
		await queryRunner.query(`ALTER TABLE "clase_profesores_user" DROP CONSTRAINT "FK_95eb8b231d10b42635c7c562980"`);
		await queryRunner.query(`ALTER TABLE "ordenador" DROP CONSTRAINT "FK_c934f8f9d63db08427e187d91c4"`);
		await queryRunner.query(`ALTER TABLE "disco" ALTER COLUMN "active" SET DEFAULT false`);
		await queryRunner.query(`ALTER TABLE "ordenador" DROP COLUMN "claseId"`);
		await queryRunner.query(`ALTER TABLE "clase" ADD "status" character varying(8) NOT NULL DEFAULT 'ACTIVE'`);
		await queryRunner.query(`DROP INDEX "IDX_f32cdcf41cd148b01194e5dbbe"`);
		await queryRunner.query(`DROP INDEX "IDX_95eb8b231d10b42635c7c56298"`);
		await queryRunner.query(`DROP TABLE "clase_profesores_user"`);
	}
}
