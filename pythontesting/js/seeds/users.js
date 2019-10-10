
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, email: "foo@foo.com", username: "foo", first_name: "Travis", last_name: "Smith", password: "happy123"}
      ]);
    });
};
