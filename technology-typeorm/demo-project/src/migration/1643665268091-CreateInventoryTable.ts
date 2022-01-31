import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateInventoryTable1643665268091 implements MigrationInterface {
    name = 'CreateInventoryTable1643665268091'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "inventory" ("sku" character varying NOT NULL, "quantity" integer NOT NULL, CONSTRAINT "PK_c33f32cdf6993fe3852073b0d56" PRIMARY KEY ("sku"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "inventory"`);
    }

}
