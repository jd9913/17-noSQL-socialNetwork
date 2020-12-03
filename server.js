const express=require('express');
const logger=require('./logger.js');
const mongoose=require('mongoose');



const morgan=require('morgan');
const bunyan = require('bunyan');

const app=express();

const PORT =process.env.PORT||33031;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require('./routes'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1/social-networking',{
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology:true

});

mongoose.set('debug', true);
mongoose.set('useCreateIndex', true);




app.listen(PORT, ()=> console.log(`Connected on localhost: ${PORT}`));

