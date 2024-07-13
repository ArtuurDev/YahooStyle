const express = require('express')

const app = express()

app.set('view engine', 'ejs')

app.get('/yahroo', (req, res) => {
    const nome = 'Artur'
    const trabalho = 'entregador'
    res.render('index', {

        nome: nome,
        trabalho: trabalho,
        nomeCaixaPNC: 'mesmo nome que o meu, infelizmente'

    })
    
    
})


app.listen(3000, console.log('app rodando'))