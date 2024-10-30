import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDB1729090383722 implements MigrationInterface {
    name = 'InitDB1729090383722'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "name" TO "fullname"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "fullname" TO "name"`);
    }

}
