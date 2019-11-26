const express = require('express'); 
const User = require('./User');  
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

app.get('/', (req, res) => {
  res.send({ message: 'endpoint working' });
});

//USER ROUTES
app.get('/users', User.readAll);
app.post('/user/:usernmae, ', User.create);
app.get('/user/:username', User.readOne);

app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});