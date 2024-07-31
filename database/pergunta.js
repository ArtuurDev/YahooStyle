const {DataTypes} = require('sequelize')

const connection = require('./database')


const Pergunta = connection.define('perguntas', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    } , 
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    }
})

Pergunta.sync({force: false}).then( () => {

})

module.exports = Pergunta