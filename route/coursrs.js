const express = require('express');
const router = express.Router()

const courses = [
    { id: 1, name: "course1" },
    { id: 2, name: "course2" },
    { id: 3, name: "cours31" }
]
router.get('/', (req, res) => {
    res.send(courses)
})
router.get('/:name/:id', (req, res) => {
    res.send(req.params)
})
router.get('/:id', (req, res) => {
    const cours = courses.find(c => c.id === parseInt(req.params.id))
    if (!cours) {
        res.status = 404
        res.send('NOT FOUNF')
    }
    res.send(cours)
})

router.post('/', (req, res) => {
    const schema = {
        name: Joi.string().min(3).required()
    }

    const result = Joi.validate(req.body, schema)
    // console.log(result)
    if (!req.body.name || req.body.length < 3) {
        res.status(400).send(result.error)
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course)
    res.send(course)
})
router.put('/:id', (req, res) => {
    const cours = courses.find(c => c.id === parseInt(req.params.id))
    if (!cours) {
        res.status = 404
        res.send('NOT FOUNF')
    }
    // const result = validateCourse(req.body)
    const { error } = validateCourse(req.body)  //result.error
    if (error) {
        res.status(400).send(error.details[0].message)
        return;
    }
    // if(!req.body.name || req.body.length < 3){
    //     res.status(400).send(result.error)
    // }
    cours.name = req.body.name
    res.send(cours)
})
router.delete('/:id', (req, res) => {
    const cours = courses.find(c => c.id === parseInt(req.params.id))
    if (!cours) {
        res.status = 404
        res.send('NOT FOUNF')
    }
    const index = courses.indexOf(cours)
    courses.splice(index, 1)

    res.send(cours)
})

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(course, schema)

}
module.exports = router