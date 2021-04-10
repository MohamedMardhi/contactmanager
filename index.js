const express = require('express');
const connectDB = require('./config/db')

const app = express();

// call db connect
connectDB();

// initialize our middleware
app.use(express.json({extended: false}))


// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/contacts', require('./routes/contacts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> console.log(`Server run in ${PORT}`));