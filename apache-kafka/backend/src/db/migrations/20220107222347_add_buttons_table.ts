import { Knex } from "knex";

const TABLE = 'buttons'

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(TABLE, table => {
        table
            .uuid('id')
            .primary()
            .notNullable()
        table
            .enu('color', ['red', 'green', 'blue'])
        table
            .datetime('timestamp')
            .notNullable()
    })
}

export async function down(knex: Knex): Promise<void> {
    knex.schema.dropTable(TABLE)
}
