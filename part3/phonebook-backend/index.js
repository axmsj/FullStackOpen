require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const Person = require('./models/person')

app.use(express.static('dist'))
app.use(express.json())
app.use(morgan(':method :url :status :body'))

morgan.token('body', (req) => {
  return JSON.stringify(req.body)
})

app.get('/', (req, res) => {
  res.send('<h1>HOME</h1>')
})

// app.get('/info', (req, res) => {
//   const numOfPersons = persons.length
//   const now = new Date().toString()
//   const amountOfPeople = `Phonebook has info for ${numOfPersons} people. <br> ${now}`
//   res.send(amountOfPeople)
// })

app.get('/api/persons', (req, res) => {
  Person.find({}).then((person) => {
    res.json(person)
  })
})

app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Person.findById(id)
    .then((foundPerson) => {
      res.send(foundPerson)
    })
    .catch((err) => next(err))
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body
  if (!body.name) {
    return res.status(400).json({
      error: 'name must be unique',
    })
  } else if (!body.number) {
    return res.status(400).json({
      error: 'number must be unique',
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person
    .save()
    .then((savedPerson) => {
      res.json(savedPerson)
    })
    .catch((err) => next(err))
})

app.put('/api/persons/:id', (req, res, next) => {
  const { number } = req.body
  const id = req.params.id

  Person.findById(id)
    .then((person) => {
      if (!person) {
        return res.status(404).end()
      }

      person.number = number

      return person.save().then((updatedPerson) => {
        res.json(updatedPerson)
      })
    })
    .catch((err) => next(err))
})

app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id

  Person.findByIdAndDelete(id)
    .then(() => {
      return res.status(204).end()
    })
    .catch((err) => next(err))
})

const errorHandler = (err, req, res, next) => {
  console.log(err.message)
  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'Malformatted id' })
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message })
  }
  next(err)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server is now listening to port ${PORT}`)
})
