// const environment = process.env.NODE_ENV || 'development'
import config from './knexfile'

const knex = require('knex')(config)

export default knex