const express = require('express');
const app = express();
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors');
const { Connection } = require('pg');
const knex = require('knex')

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image')

const db = knex({
    client: 'pg',
    connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'sjdm7536',
    database: 'facerecognition'
    }
});

db.select('*').from('users').then(data => {
    console.log(data);
});

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => { res.send('it is working!!!') })

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt)})

app.post('/register', (req, res) =>{ register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})

app.put('/image', (req, res) => { image.handleImage(req, res, db)})


app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on ${process.env.PORT}`);
})
