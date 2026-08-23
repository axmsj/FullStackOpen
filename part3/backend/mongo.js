const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give password as arguement');
  process.exit();
}

const password = encodeURIComponent(process.argv[2]);

const url = `mongodb+srv://fullstack:${password}@cluster0.swr7qiy.mongodb.net/noteApp?appName=Cluster0`;

mongoose.set('strictQuery', false);

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model('Note', noteSchema);

mongoose
  .connect(url, { family: 4 })
  .then(() => {
    console.log('CONNECTED TO MONGO ATLAS');
    return Note.find({});
  })
  .then((res) => {
    res.forEach((note) => {
      console.log(note);
    });
    mongoose.connection.close();
  });
