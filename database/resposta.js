const {DataTypes} = require('sequelize')
const connection = require('./database')


const Resposta = connection.define('respostas', {
    
    corpo: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    respostaId: {
        type: DataTypes.TEXT,
        allowNull: false
    }
})


Resposta.sync({force: false}).then(()=> {
    
})

module.exports = Resposta
