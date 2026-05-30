import { useState } from 'react';

const App = () => {
  // array for persons
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);

  // for our input value
  const [newName, setNewName] = useState('');

  const addPerson = (e) => {
    e.preventDefault();
    console.log('button clicked', e.target);
    const personObject = {
      name: newName,
    };
    setPersons(persons.concat(personObject));
    setNewName('');
  };

  const handleNote = (e) => {
    console.log(e.target.value);
    setNewName(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNote} />
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
        return <div key={x.name}>{x.name}</div>;
      })}
    </div>
  );
};

export default App;
