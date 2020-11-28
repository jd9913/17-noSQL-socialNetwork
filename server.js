const express=require('express');
const logger=require('./logger.js');
const mongoose=require('mongoose');

const app=express();

const PORT =process.env.PORT||3300;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require('./routes'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-networking',{
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology:true

});

mongoose.set('debug', true);

app.listenerCount(PORT, ()=> console.log(`🌍 Connected on localhost:${PORT}`));

