import {MigrationInterface, QueryRunner} from "typeorm";

export class addProjectionOffsetTable1651508552157 implements MigrationInterface {
    name = 'addProjectionOffsetTable1651508552157'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "projection_offset" ("offset" bigint NOT NULL, "stream" character varying NOT NULL, CONSTRAINT "PK_144c9de86cb309c02c789bc3b4f" PRIMARY KEY ("offset", "stream"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "projection_offset"`);
    }

}
