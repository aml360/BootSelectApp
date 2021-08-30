import { MigrationInterface, QueryRunner } from 'typeorm';

export class initMigration1617641872226 implements MigrationInterface {
	name = 'initMigration1617641872226';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "user" ("username" character varying(40) NOT NULL, "password" character varying NOT NULL, "email" character varying, "name" character varying, "lastname" character varying NOT NULL, "created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "active" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_78a916df40e02a9deb1c4b75edb" PRIMARY KEY ("username"))`,
		);
		await queryRunner.query(
			`CREATE TABLE "roles" ("id" SERIAL NOT NULL, "name" character varying(20) NOT NULL, "description" text NOT NULL, "status" character varying(8) NOT NULL DEFAULT 'ACTIVE', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE TABLE "user_roles" ("userUsername" character varying(40) NOT NULL, "rolesId" integer NOT NULL, CONSTRAINT "PK_71cffb6fd345f1d587c399cb75d" PRIMARY KEY ("userUsername", "rolesId"))`,
		);
		await queryRunner.query(`CREATE INDEX "IDX_86a650293c2a31b8328a97cabd" ON "user_roles" ("userUsername") `);
		await queryRunner.query(`CREATE INDEX "IDX_13380e7efec83468d73fc37938" ON "user_roles" ("rolesId") `);
		await queryRunner.query(
			`ALTER TABLE "user_roles" ADD CONSTRAINT "FK_86a650293c2a31b8328a97cabd0" FOREIGN KEY ("userUsername") REFERENCES "user"("username") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "user_roles" ADD CONSTRAINT "FK_13380e7efec83468d73fc37938e" FOREIGN KEY ("rolesId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "FK_13380e7efec83468d73fc37938e"`);
		await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "FK_86a650293c2a31b8328a97cabd0"`);
		await queryRunner.query(`DROP INDEX "IDX_13380e7efec83468d73fc37938"`);
		await queryRunner.query(`DROP INDEX "IDX_86a650293c2a31b8328a97cabd"`);
		await queryRunner.query(`DROP TABLE "user_roles"`);
		await queryRunner.query(`DROP TABLE "roles"`);
		await queryRunner.query(`DROP TABLE "user"`);
	}
}
