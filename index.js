const express = require('express')

const app = express()

app.set('view engine', 'ejs')

app.get('/yahroo', (req, res) => {

    res.render('index')
    
    
})
app.get('/yahroo/perfil', (req, res) => {

    res.render('principal/perfil')
    
    
})

app.listen(3000, console.log('app rodando'))