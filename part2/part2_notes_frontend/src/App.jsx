import { useState, useEffect } from 'react';
import axios from 'axios';
import Note from './components/Note';

const App = () => {
  // notes array
  const [notes, setNotes] = useState([]);

  //user submitted input
  const [newNote, setNewNote] = useState('');

  // keeps track of notes to be display
  const [showAll, setShowAll] = useState(true);

  const hook = () => {
    console.log('effect');
    axios.get('http://localhost:3001/notes').then((res) => {
      console.log('promise fulfilled');
      console.log('whole response', res);
      console.log('res data', res.data);
      setNotes(res.data);
    });
  };

  useEffect(hook, []);

  // on form submit
  const addNote = (e) => {
    e.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: String(notes.length + 1),
    };
    setNotes(notes.concat(noteObject));
    setNewNote('');
  };

  // allow us to edit the state of the input value
  const handleNoteChange = (e) => {
    console.log(e.target.value);
    setNewNote(e.target.value);
  };

  const notesToShow = showAll ? notes : notes.filter((x) => x.important);

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>show {showAll ? 'important' : 'all'}</button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type='submit'>save</button>
      </form>
    </div>
  );
};

export default App;
