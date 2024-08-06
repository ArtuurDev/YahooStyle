

const {Sequelize} = require('sequelize')


const connection = new Sequelize('yahrrostyle', 'root', '92546331', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection