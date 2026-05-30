import { useState } from 'react';

const App = () => {
  // array for persons
  const [persons, setPersons] = useState([{ name: 'Arto Hellas', number: '123-456-7890' }]);

  // for our input value
  const [newName, setNewName] = useState('');

  // for our number value
  const [newNumber, setNewNumber] = useState('');

  const addPerson = (e) => {
    e.preventDefault();
    console.log('button clicked', e.target);
    const personObject = {
      name: newName,
      number: newNumber,
    };
    setPersons(persons.concat(personObject));
    setNewName('');
    setNewNumber('');
  };

  const handleNote = (e) => {
    console.log(e.target.value);
    setNewName(e.target.value);
  };

  const handleNumber = (e) => {
    console.log(e.target.value);
    setNewNumber(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNote} required />
        </div>
        <div>
          number: <input type='tel' value={newNumber} onChange={handleNumber} required />{' '}
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      {persons.map((x) => {
        if (x.name === newName) {
          alert(`${newName} is already added to phonebook`);
          setNewName('');
        }
        return (
          <div key={x.name}>
            {x.name} {x.number}
          </div>
        );
      })}
    </div>
  );
};

export default App;
