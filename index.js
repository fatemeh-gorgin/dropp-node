const config = require('./config')
const Joi = require('joi')
const helmet = require('helmet')
const morgan = require('morgan')
const express = require('express')
const app = express()
const logger = require('./middleware/logger')
const courses = require('./route/coursrs')
app.use('/api/courses' , courses)
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(express.static('public'))
app.use(helmet())
app.use(morgan('tiny'))
app.use(logger)
app.use(function(req , res , next){
    console.log("authenticating...")
    next()
})
const courses = [
    { id: 1, name: "course1" },
    { id: 2, name: "course2" },
    {
        id: 3, name: "cours31"
    }
]
app.get('/', (req, res) => {
    console.log("herrram")
    res.send('hello world!!!!')
});

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`run in port ${port}`))