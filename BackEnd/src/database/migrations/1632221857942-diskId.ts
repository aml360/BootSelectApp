import {MigrationInterface, QueryRunner} from "typeorm";

export class diskId1632221857942 implements MigrationInterface {
    name = 'diskId1632221857942'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user_roles" DROP CONSTRAINT "FK_86a650293c2a31b8328a97cabd0"`);
        await queryRunner.query(`ALTER TABLE "public"."user_roles" DROP CONSTRAINT "FK_13380e7efec83468d73fc37938e"`);
        await queryRunner.query(`ALTER TABLE "public"."clase_profesores_user" DROP CONSTRAINT "FK_95eb8b231d10b42635c7c562980"`);
        await queryRunner.query(`ALTER TABLE "public"."clase_profesores_user" DROP CONSTRAINT "FK_f32cdcf41cd148b01194e5dbbee"`);
        await queryRunner.query(`ALTER TABLE "public"."disco" ADD "dbId" BIGSERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."disco" DROP CONSTRAINT "PK_2373492e887ad07510d3e00693d"`);
        await queryRunner.query(`ALTER TABLE "public"."disco" ADD CONSTRAINT "PK_a375067dbf002efd105d0a54df9" PRIMARY KEY ("id", "dbId")`);
        await queryRunner.query(`ALTER TABLE "public"."disco" DROP CONSTRAINT "PK_a375067dbf002efd105d0a54df9"`);
        await queryRunner.query(`ALTER TABLE "public"."disco" ADD CONSTRAINT "PK_b1cadb77b7d9d930f6fde1c4162" PRIMARY KEY ("dbId")`);
        await queryRunner.query(`ALTER TABLE "public"."disco" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "public"."disco_id_seq"`);
        await queryRunner.query(`ALTER TABLE "public"."user_roles" ADD CONSTRAINT "FK_86a650293c2a31b8328a97cabd0" FOREIGN KEY ("userUsername") REFERENCES "user"("username") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."user_roles" ADD CONSTRAINT "FK_13380e7efec83468d73fc37938e" FOREIGN KEY ("rolesId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."clase_profesores_user" ADD CONSTRAINT "FK_95eb8b231d10b42635c7c562980" FOREIGN KEY ("claseId") REFERENCES "clase"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."clase_profesores_user" ADD CONSTRAINT "FK_f32cdcf41cd148b01194e5dbbee" FOREIGN KEY ("userUsername") REFERENCES "user"("username") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."clase_profesores_user" DROP CONSTRAINT "FK_f32cdcf41cd148b01194e5dbbee"`);
        await queryRunner.query(`ALTER TABLE "public"."clase_profesores_user" DROP CONSTRAINT "FK_95eb8b231d10b42635c7c562980"`);
        await queryRunner.query(`ALTER TABLE "public"."user_roles" DROP CONSTRAINT "FK_13380e7efec83468d73fc37938e"`);
        await queryRunner.query(`ALTER TABLE "public"."user_roles" DROP CONSTRAINT "FK_86a650293c2a31b8328a97cabd0"`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "public"."disco_id_seq" OWNED BY "public"."disco"."id"`);
        await queryRunner.query(`ALTER TABLE "public"."disco" ALTER COLUMN "id" SET DEFAULT nextval('"public"."disco_id_seq"')`);
        await queryRunner.query(`ALTER TABLE "public"."disco" DROP CONSTRAINT "PK_b1cadb77b7d9d930f6fde1c4162"`);
        await queryRunner.query(`ALTER TABLE "public"."disco" ADD CONSTRAINT "PK_a375067dbf002efd105d0a54df9" PRIMARY KEY ("id", "dbId")`);
        await queryRunner.query(`ALTER TABLE "public"."disco" DROP CONSTRAINT "PK_a375067dbf002efd105d0a54df9"`);
        await queryRunner.query(`ALTER TABLE "public"."disco" ADD CONSTRAINT "PK_2373492e887ad07510d3e00693d" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "public"."disco" DROP COLUMN "dbId"`);
        await queryRunner.query(`ALTER TABLE "public"."clase_profesores_user" ADD CONSTRAINT "FK_f32cdcf41cd148b01194e5dbbee" FOREIGN KEY ("userUsername") REFERENCES "user"("username") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."clase_profesores_user" ADD CONSTRAINT "FK_95eb8b231d10b42635c7c562980" FOREIGN KEY ("claseId") REFERENCES "clase"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."user_roles" ADD CONSTRAINT "FK_13380e7efec83468d73fc37938e" FOREIGN KEY ("rolesId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."user_roles" ADD CONSTRAINT "FK_86a650293c2a31b8328a97cabd0" FOREIGN KEY ("userUsername") REFERENCES "user"("username") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
