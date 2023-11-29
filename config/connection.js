const { connect, connection } = require('mongoose')

const connectionString = process.env.MONGOURI || 'mongodb://127.0.0.1:27017/socialBE'

connect(connectionString)

module.exports = connection