const TABLE = 'messages'

exports.up = function(knex) {
    return knex.schema.createTable(TABLE, table => {
        table
            .uuid('id')
            .primary()
            .notNullable()
        table
            .text('body')
        table
            .datetime('timestamp')
            .notNullable()
    })
};

exports.down = function(knex) {
  return knex.scema.dropTable(TABLE)
};
