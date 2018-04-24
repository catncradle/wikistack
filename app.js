const express = require('express')
const volleyball = require('volleyball')
const bodyParser = require('body-parser')
const nunjucks = require('nunjucks')
const router = require('./routes')
const {Page,User} = require('./models')


const app = express()
console.log(Page+'')

//middleware
app.use(volleyball)
app.use(express.static('./public'))

app.set('view engine', 'html'); // have res.render work with html files
app.engine('html', nunjucks.render); // when giving html files to res.render, tell it to use nunjucks
const env = nunjucks.configure('views',{noCache:true}); // point nunjucks to the proper directory for templates

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use(router)









app.listen('3000',()=>{
    console.log('listening on port 3000')
})

