import { useState, useEffect } from 'react';
import axios from 'axios';
import Note from './components/Note';
import noteService from './services/notes';

const App = () => {
  // notes array
  const [notes, setNotes] = useState([]);

  //user submitted input
  const [newNote, setNewNote] = useState('');

  // keeps track of notes to be display
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    noteService.getAll().then((initialResponse) => setNotes(initialResponse));
  }, []);

  // on form submit
  const addNote = (e) => {
    e.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    };

    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
      setNewNote('');
    });
  };

  const toggleImportantOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id === id ? returnedNote : note)));
      })
      .catch((err) => {
        alert(`the note '${note.content} was already deleted from the server`);
        const filterNotes = notes.filter((n) => n.id !== id);

        setNotes(notes.filter((n) => n.id !== id));
      });
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
          <Note key={note.id} note={note} toggleImportance={() => toggleImportantOf(note.id)} />
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
