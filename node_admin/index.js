const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));

mongoose
  .connect(
    'mongodb://mongo:27017/docker-node-mongo',
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => console.log(err));

  const Photo = require('./models/Photo');
  let isFirst = true;

  app.get('/', (req, res) => {
    Photo.find()
      .then(photos => { 
        if(isFirst) {
          res.sendFile('views/landing.html', { root: __dirname });
          isFirst = false;
          Photo.deleteMany({}, () => {
            Photo.create(
              {
                url: "https://images.unsplash.com/photo-1580895456895-cfdf02e4c23f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
                titre: "Titre 1",
              },
              {
                url: "https://images.unsplash.com/photo-1493540447904-49763eecf55f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
                titre: "Titre 2",
              },
              {
                url: "https://images.unsplash.com/photo-1531581147762-5961e6e2e6b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
                titre: "Titre 3",
              },
              {
                url: "https://images.unsplash.com/photo-1531819177115-428566ccfb50?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80",
                titre: "Titre 4",
              },
              {
                url: "https://images.unsplash.com/photo-1506606401543-2e73709cebb4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
                titre: "Titre 5",
              },
              {
                url: "https://images.unsplash.com/photo-1541423408854-5df732b6f6d1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
                titre: "Titre 6",
              },
              {
                url: "https://images.unsplash.com/photo-1606152536277-5aa1fd33e150?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1365&q=80",
                titre: "Titre 7",
              },
              {
                url: "https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1335&q=80",
                titre: "Titre 8",
              },
              {
                url: "https://images.unsplash.com/photo-1517328894681-0f5dfabd463c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1364&q=80",
                titre: "Titre 9",
              },
            )
          })
        } else {
          res.render('index', { photos });
        }
      
      })
      .catch(err => res.status(404).json({ msg: 'No photos found' }));
  });


app.get('/del', (req, res) => {
  Photo.deleteMany({}, (error, doc) => {})
  res.send('delete');
})

app.post('/photo/add', (req, res) => {
  const newPhoto = new Photo({
    url: req.body.url,
    titre: req.body.titre
  });
  newPhoto.save().then(() => res.redirect('/'));
});

app.listen(port, () => {
  console.log(`server at port ${port}`)
})