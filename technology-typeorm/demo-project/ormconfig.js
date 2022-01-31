require('dotenv').config({ path: '../.env.local' })

module.exports = {
   type: 'postgres',
   host: 'localhost',
   port: 5432,
   username: 'postgres',
   password: 'postgres',
   database: 'postgres',
   synchronize: false,
   logging: false,
   entities: ['src/entity/**/*.ts'],
   migrations: ['src/migration/**/*.ts'],
   subscribers: ['src/subscriber/**/*.ts'],
   cli: {
      entitiesDir: 'src/entity',
      migrationsDir: 'src/migration',
      subscribersDir: 'src/subscriber',
   },
}