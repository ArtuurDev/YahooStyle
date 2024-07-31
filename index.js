const express = require('express')
const app = express()
const connection = require('./database/database')
const Pergunta = require('./database/pergunta')


//conexão banco de dados 
connection
    connection.authenticate()
    .then(() => {
    console.log('conexão feita com sucesso')
    }).catch((err)=>{
        console.log(err)
    })



// view
app.set('view engine', 'ejs')

//arquivos estaticos
app.use(express.static('public'))

// acessar requisiçao e dados de formularios 
app.use(express.urlencoded({ extended: true}))
app.use(express.json())



app.get('/', (req, res) => {

    Pergunta.findAll({raw: true}).then(perguntas => {
        res.render('index', {
            perguntas: perguntas
        })
    })
    
    
    
})
app.get('/perguntas', (req, res) => {

    res.render('perguntar')
})
    
 
app.post('/salvarpergunta', (req, res) => {
    const titulo = req.body.titulo
    const descricao = req.body.descricao
    Pergunta.create({
        title: titulo,
        description: descricao
    }).then(() => {
        res.redirect('/')
    })
})


app.listen(3000, console.log('app rodando'))