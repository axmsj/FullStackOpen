require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const Person = require('./models/person');

app.use(express.static('dist'));
app.use(express.json());
app.use(morgan(':method :url :status :body'));

morgan.token('body', (req) => {
  return JSON.stringify(req.body);
});

// const requestLogger = (req, res, next) => {
//   console.log('Method: ', req.method);
//   console.log('Path: ', req.path);
//   console.log('Body: ', req.body);
//   console.log('-------');
//   next();
// };
// app.use(requestLogger);

// const unknownEndpoint = (req, res) => {
//   res.status(404).send({ error: 'unknown endpoint' });
// };

// app.use(unknownEndpoint);

// let persons = [
//   {
//     id: '1',
//     name: 'Arto Hellas',
//     number: '040-123456',
//   },
//   {
//     id: '2',
//     name: 'Ada Lovelace',
//     number: '39-44-5323523',
//   },
//   {
//     id: '3',
//     name: 'Dan Abramov',
//     number: '12-43-234345',
//   },
//   {
//     id: '4',
//     name: 'Mary Poppendieck',
//     number: '39-23-6423122',
//   },
// ];

app.get('/', (req, res) => {
  res.send('<h1>HOME</h1>');
});

app.get('/info', (req, res) => {
  const numOfPersons = persons.length;
  const now = new Date().toString();
  const amountOfPeople = `Phonebook has info for ${numOfPersons} people. <br> ${now}`;
  res.send(amountOfPeople);
});

app.get('/api/persons', (req, res) => {
  Person.find({}).then((person) => {
    res.json(person);
  });
});

app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id;
  Person.findById(id)
    .then((foundPerson) => {
      res.send(foundPerson);
    })
    .catch((err) => next(err));
});

const generateId = () => {
  const id = Math.floor(Math.random() * 500) + 5;
  return String(id + 1);
};

app.post('/api/persons', (req, res, next) => {
  const body = req.body;
  if (!body.name) {
    return res.status(400).json({
      error: 'name must be unique',
    });
  } else if (!body.number) {
    return res.status(400).json({
      error: 'number must be unique',
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((savedPerson) => {
      res.json(savedPerson);
    })
    .catch((err) => next(err));
});

app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body;
  const id = req.params.id;

  Person.findById(id)
    .then((person) => {
      if (!person) {
        return res.status(404).end();
      }

      person.number = number;

      return person.save().then((updatedPerson) => {
        res.json(updatedPerson);
      });
    })
    .catch((err) => next(err));
});

app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id;

  Person.findByIdAndDelete(id)
    .then((result) => {
      return res.status(204).end();
    })
    .catch((err) => next(err));
});

const errorHandler = (err, req, res, next) => {
  console.log(err.message);
  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'Malformatted id' });
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }
  next(err);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is now listening to port ${PORT}`);
});
