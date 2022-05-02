import {MigrationInterface, QueryRunner} from "typeorm";

export class addProjectionOffsetTable1651491570775 implements MigrationInterface {
    name = 'addProjectionOffsetTable1651491570775'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "projection_offset" ("commit_position" bigint NOT NULL, CONSTRAINT "PK_1ad69aeb6b57886ae8a227a6ba3" PRIMARY KEY ("commit_position"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "projection_offset"`);
    }

}
