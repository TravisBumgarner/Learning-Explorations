import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUsersTable1642706532313 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE users (
                id uuid PRIMARY KEY,
                first_name text,
                last_name text,
                age integer
            );  
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE users;
        `)
    }

}
