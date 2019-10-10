
exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
        table
            .uuid('id')
            .primary()
            .notNullable()
        table
            .text('email')
            .unique()
            .notNullable()
        table
            .text('username')
            .unique()
            .notNullable()
        table.text('first_name').notNullable()
        table.text('last_name').notNullable()
        table.text('password').notNullable()
    })
}

exports.down = function(knex) {
    return knex.schema.dropTable('users')
};
