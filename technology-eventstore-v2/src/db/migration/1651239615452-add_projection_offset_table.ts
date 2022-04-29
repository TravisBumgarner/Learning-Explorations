import {MigrationInterface, QueryRunner} from "typeorm";

export class addProjectionOffsetTable1651239615452 implements MigrationInterface {
    name = 'addProjectionOffsetTable1651239615452'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "projection_offset" ("id" character varying NOT NULL, "reviewerId" character varying NOT NULL, "worksheetId" character varying NOT NULL, CONSTRAINT "PK_550c91922d7043323e612326b7a" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "projection_offset"`);
    }

}
