const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = 3000
const users = [];
let counter = 1;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Create user
app.put('/user', (req, res) => {
    const { username, password } = req.body;
    if(!username || !password) {
        res.status(400).send('Incorrect body');
    }
    if(username.length < 3 || password.length < 6) {
        res.status(400).send('Incorrect body');
    }
    
    const newUser = {
        id: counter,
        username,
        password
    };
    counter++;
    users.push(newUser);
    res.sendStatus(201);
});

// User Login
app.post('/user/login', (req, res) => {
    const { username, password } = req.body;
    if(!username || !password) {
        res.status(400).send('Username or password are incorrect');
        return;
    }
    const requestedUser = users.find(user => (username === user.username && password.toString() === user.password));
    if(requestedUser) {
        res.status(200).send('Login successfully');
    }
});

// Get all users
app.get('/user', (req, res) => {
    res.send(users);
});

// Get user by id
app.get('/user/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const requestedUser = users.find(user => user.id === userId);
    if(!requestedUser) {
        res.sendStatus(404);
        return;
    }
    res.send(requestedUser);
});

// Delete user
app.delete('user/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const requestedUser = uesrs.find(user => user.id === userId);
    if(!requestedUser) {
        res.status(404).send('User does not exist');
        return;
    }
    users.splice(users.indexOf(requestedUser), 1);
    res.sendStatus(204);

});

// Edit user
app.post('/user/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const requestedUser = users.find(user => user.id === userId);
    if(!requestedUser) {
        res.status(404).send('User not found');
        return;
    }
    const { username, password } = req.body;
    if(username) {
        if(!username.length >= 3) {
            res.status(400).send('Username must contain at least 3 characters');
        } else {
            users[users.indexOf(requestedUser)].username = username;
        }
    }
    if(password) {
        if(!password.toString().length >= 6) {
            res.status(400).send('Password must contain at least 6 characters');
        } else {
            users[users.indexOf(requestedUser)].password = password;
        }
    }
    res.status(200).send('User has been changed');
});

app.put('/photo', (req, res) => {
    const { title, filename } = req.body;
    if(!title || !filename) {
        res.status(400).send('Incorrect body');
        return;
    }
    const newPhoto = {
        id: PCounter,
        title,
        filename
    };
    PCounter++;
    photos.push(newPhoto);
    res.sendStatus(201);
});

app.get('/photo', (req, res) => {
    res.send(photos);
});

app.get('/photo/:id', (req, res) => {
    const photoId = parseInt(req.params.id);
    const requestedPhoto = photos.find(photo => photo.id === photoId);
    if(!requestedPhoto) {
        res.status(404).send('Photo not found');
        return;
    }
    res.send(requestedPhoto);
});

app.delete('/photo/:id', ( req, res) => {
    const photoId = parseInt(req.params.id);
    const requestedPhoto = photos.find(photo => photo.id === photoId);
    if(!requestedPhoto) {
        res.status(404).send('Photo not found');
    }
    photos.splice(photos.indexOf(requestedPhoto), 1);
    res.sendStatus(204);
});

app.post('/photo/:id', (req, res) => {
    const photoId = parseInt(req.params.id);
    const requestedPhoto = photo.find(photo => photo.id === photoId);
    if(!requestedPhoto) {
        res.status(404).send('Photo not found');
    }
    const { title, filename } = req.body;
    if(!title || !filename) {
        res.status(400).send('Incorrect body');
        return;
    }
    const updatePhoto = {
        id: photoId,
        title,
        filename
    };
    res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});