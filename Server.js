const express = require('express'); 
const User = require('./User');  
const app = express();
const PORT = 80;

app.get('/', (req, res) => {
  res.send({ message: 'endpoint working' });
});

app.get('/users', User.readAll);

app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});