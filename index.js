const express = require('express')
const app = express()
const connection = require('./database/database')
const Pergunta = require('./database/pergunta')
const Resposta = require('./database/resposta')
const { where } = require('sequelize')


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



app.get('/', async (req, res) => {

    
        const pergunta = await Pergunta.findAll({
            raw: true, 
            order: [['id', 'DESC']]} )

            if (pergunta) {
                return res.render('index', {
                    perguntas: pergunta
                })
            } 
            else {
                console.log('err')
                return res.send('erro')
            }    
    
})
app.get('/perguntar', (req, res) => {

    res.render('perguntar')
})
    
 
app.post('/salvarpergunta', async (req, res) => {

    const title = req.body.titulo
    const description = req.body.descricao
    
    if (!title || ! description) {
        console.log('erro: não é possivel salvar campos nulos')
        return res.status(400).send('erro: não é possivel salvar campos nulos')
    }

    try {

        const pergunta = await Pergunta.create({
            
            title: title,
            description: description
        })

        return res.redirect('/')

    } catch (error) {

        console.log('erro ao salvar pergunta', error)
        return res.status(400).send('erro ao salvar pergunta')
    }

    
})

app.get('/pergunta/:id', async (req, res) => {
    
    const id = req.params.id

    const pergunta = await Pergunta.findOne({
        where: {
            id: id
        }
    })

        if (pergunta != undefined) {
           res.render('pergunta', {
            pergunta: pergunta
           })
        }
        else {
            res.redirect('/')
        }
    
})

app.post('/salvarresposta', async (req, res) =>{

    
    const corpoResposta = req.body.corpo
    const idResposta = req.body.respostaId
    

    if (!corpoResposta || !idResposta) {

        console.log('erro: titulo e/ou descriçao não podem ser nulos')
        return res.status(400).send('erro: titulo e/ou descriçao não podem ser nulos')
    }

    try {
        const resposta = Resposta.create({

            corpo: corpoResposta,
            respostaId: idResposta 
        })
    
        return res.redirect('/')

    } catch (error) {

        console.log('erro ao salvar resposta', error)
        return res.status(500).send('erro ao salvar reeposta')

    }
 
})


app.get('/visu/:id', async (req, res) => {

    const id = req.params.id

    try {
        const pergunta = await Pergunta.findOne({
            where: {
                id: id
            }
        })

        if (!pergunta) {
            return res.status(400).send('erro')
        }

        console.log(pergunta.title)


        const resposta = await Resposta.findOne({
            where: {
                respostaId: id
            }
        })

        if (!resposta) {

            return res.status(400).send('erro')
        } 

        return res.render('visu', {
            pergunta: pergunta,
            resposta: resposta
        })


    }
    catch (error) {

    }


})



app.listen(3000, console.log('app rodando'))