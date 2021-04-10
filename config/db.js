const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = ()=> {
    mongoose.connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: true
    })
    .then(()=>console.log('db CONNECTED'))
    .catch(err => {
        console.error(err.message);
        process.exit(1)
    })
}

module.exports = connectDB;