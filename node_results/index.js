const express = require('express')
const mongoose = require('mongoose');
const app = express()
const port = 3001;

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));

mongoose
  .connect(
    'mongodb://mongo:27017/docker-node-mongo',
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const Photo = require('./models/Photo');

app.get('/', (req, res) => {
  Photo.find()
    .then(photos => res.render('index', { photos }))
    .catch(err => res.status(404).json({ msg: 'No photos found' }));
});

app.listen(port, () => {
  console.log(`server at port ${port}`)
})