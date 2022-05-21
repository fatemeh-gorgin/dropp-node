const Joi = require('joi')
const express = require('express')
const app = express()
app.use(express.json())
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
app.get('/api/courses', (req, res) => {
    res.send(courses)
})
app.get('/api/courses/:name/:id', (req, res) => {
    res.send(req.params)
})
app.get('/api/courses/:id', (req, res) => {
    const cours = courses.find(c => c.id === parseInt(req.params.id))
    if (!cours) {
        res.status = 404
        res.send('NOT FOUNF')
    }
    res.send(cours)
})

app.post('/api/courses' , (req , res) =>{
    const schema = {
        name: Joi.string().min(3).required()
    }
   
    const result = Joi.validate(req.body, schema)
    // console.log(result)
    if(!req.body.name || req.body.length < 3){
        res.status(400).send(result.error)
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course)
    res.send(course)
})
app.put('/api/courses/:id' , (req, res)=>{
    const cours = courses.find(c => c.id === parseInt(req.params.id))
    if (!cours) {
        res.status = 404
        res.send('NOT FOUNF')
    }
    // const result = validateCourse(req.body)
    const {error} = validateCourse(req.body)  //result.error
    if(error){
        res.status(400).send(error.details[0].message)
        return;
    }
    // if(!req.body.name || req.body.length < 3){
    //     res.status(400).send(result.error)
    // }
    cours.name = req.body.name
    res.send(cours)
})
app.delete('/api/courses/:id' , (req , res) => {
    const cours = courses.find(c => c.id === parseInt(req.params.id))
    if (!cours) {
        res.status = 404
        res.send('NOT FOUNF')
    }
    const index = courses.indexOf(cours)
    courses.splice(index , 1)

    res.send(cours)
})

function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(course, schema)

}
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`run in port ${port}`))