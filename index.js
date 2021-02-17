require('dotenv').config()
const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const { response } = require('express')
// const db2 = require('./eventQueries')
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client('422134929902-nl2c86n17fm0nrk2kkvt3sl8v4cf39h3.apps.googleusercontent.com');

const port = 3001

app.use(cors())

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

const googleAuth = async (token) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: '422134929902-nl2c86n17fm0nrk2kkvt3sl8v4cf39h3.apps.googleusercontent.com',
  });
  if (ticket) {
    const payload = ticket.getPayload();
    const { sub, email, name, given_name } = payload;
    return { sub, email, name, given_name };
  } else {
    console.log(ticket);
  }
};

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
  })

app.post('/auth/signin', async (req, res) => {
  const data = await googleAuth(req.body.id_token);

  // console.log(data);
  console.log(res);
  console.log(req)
  res.send(data)
  });

// app.get('/users', db.getUsers)
// app.get('/users/:id', db.getUserById)
// app.post('/users', db.createUser)
// app.put('/users/:id', db.updateUser)
// app.delete('/users/:id', db.deleteUser)

app.get('/events', db.getEvents)
app.get('/events/:id', db.getEventById)
app.post('/events', db.createEvent)
app.put('/events/:id', db.updateEvent)
app.delete('/events/:id', db.deleteEvent)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})