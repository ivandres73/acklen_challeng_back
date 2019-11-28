const express = require('express');
const User = require('./User');
const Head = require('./Head')
const app = express();
const PORT = 80;

//CORS HANDLING BEFORE ANY GET/POST/PUT...
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');//i can change it only to aws pc
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-Width, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json();
  }
  next();
})

app.use(express.json()); //Used to parse JSON bodies instead of body-parser
//app.use(express.urlencoded());

app.get('/', (req, res) => {
  res.send({ message: 'endpoint working' });
});

//USER ROUTES
app.get('/users', User.readAll);
app.get('/user/:username', User.readOne);
app.post('/user', User.createUser);
app.post('/login', User.logIn);

//HEAD ROUTES
app.get('/heads', Head.readAll);
app.get('/head/next', Head.getNextImgUrl);
app.get('/head/back', Head.getPrevImgUrl);

app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});