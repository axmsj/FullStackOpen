import { useState, useEffect } from 'react';
import axios from 'axios';
import personService from './services/persons';

const Filter = (props) => {
  return (
    <>
      filter shown with <input type='text' value={props.value} onChange={props.onChange} />
    </>
  );
};

const PersonForm = ({ onSubmit, valueName, onChangeName, valueNum, onChangeNum }) => {
  console.log();
  return (
    <>
      <form onSubmit={onSubmit}>
        <div>
          Name: <input type='text' value={valueName} onChange={onChangeName} />
        </div>
        <div>
          Number: <input type='text' value={valueNum} onChange={onChangeNum} />
        </div>
        <button type='submit'>add</button>
      </form>
    </>
  );
};

const Persons = ({ valueName, valueNum, toggleDelete }) => {
  return (
    <>
      <div>
        {valueName} {valueNum}
        <button onClick={toggleDelete}>Delete</button>
      </div>
    </>
  );
};

const App = () => {
  // array for persons
  const [persons, setPersons] = useState([]);

  // for our input value
  const [newName, setNewName] = useState('');

  // for our number value
  const [newNumber, setNewNumber] = useState('');

  //filter input
  const [newFilter, setNewFilter] = useState('');

  const hook = () => {
    console.log('effect');
    personService.getAll().then((initialPerson) => {
      setPersons(initialPerson);
    });

    // axios.get('http://localhost:3001/persons').then((res) => {
    //   console.log('promise fulfilled');
    //   setPersons(res.data);
    //   console.log(res.data);
    // });
  };

  useEffect(hook, []);

  const addPerson = (e) => {
    e.preventDefault();
    console.log('button clicked', e.target);
    const personObject = {
      name: newName,
      number: newNumber,
      id: Number(persons.length + 1),
    };
    setNewName('');
    setNewNumber('');
    const nameExist = persons.some((person) => person.name.toLowerCase() === newName.toLowerCase());
    if (nameExist) {
      let message = `${newName} is already added to phonebook, replace the old number with a new one?`;
      if (window.confirm(message)) {
        const person = persons.find((p) => p.name.toLowerCase() == newName.toLowerCase());
        console.log(person);
        const changedPerson = { ...person, number: newNumber };
        console.log(changedPerson);

        personService.update(person.id, changedPerson).then((res) => {
          console.log(res);
          setPersons(persons.map((p) => (p.id === person.id ? res : p)));
        });
      }
    } else {
      axios.post('http://localhost:3001/persons', personObject).then((res) => {
        setPersons(persons.concat(res.data));
      });
    }
  };

  const delClick = (currObj) => {
    let message = `Delete ${currObj.name}?`;
    if (window.confirm(message)) {
      personService.del(currObj.id).then((res) => res);
      setPersons(persons.filter((p) => p.id !== currObj.id));
    }
  };

  const handleName = (e) => {
    console.log(e.target.value);
    setNewName(e.target.value);
  };

  const handleNumber = (e) => {
    console.log(e.target.value);
    setNewNumber(e.target.value);
  };

  const handleFilter = (e) => {
    console.log(e.target.value);
    setNewFilter(e.target.value);
  };

  const peopleToShow = persons.filter((person) => person.name.toLowerCase().includes(newFilter.toLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newFilter} onChange={handleFilter} />
      <h2>add a new</h2>
      <PersonForm
        onSubmit={addPerson}
        valueName={newName}
        onChangeName={handleName}
        valueNum={newNumber}
        onChangeNum={handleNumber}
      />

      <h2>Numbers</h2>
      {peopleToShow.map((x) => {
        {
          return (
            <div key={x.id}>
              <Persons valueName={x.name} valueNum={x.number} toggleDelete={() => delClick(x)} />
            </div>
          );
        }
      })}
    </div>
  );
};

export default App;
