const cors = require('cors');
const express = require('express');

const notesRouter = require('./routes/notes/notes.route');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

// cors accepts all origins for testing
app.use(
  cors({
    origin: '*', // TODO: change to only allowed origins
  })
);

app.use(notesRouter);

app.listen(PORT, (err) => {
  console.log(`Listening on port ${PORT}`);

  if (err) {
    console.log('Error starting the server');
  }
});
