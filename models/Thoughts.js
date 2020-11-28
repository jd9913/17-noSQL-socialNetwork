const { Schema, model }=require('mongoose');

const ThoughtSchema=new Schema({
    thoughtText:{
        type: String
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    username:{
        type: String
    },

    reactions:{
        type: String
    }
});

const Thoughts=model ('Thoughts', ThoughtSchema);

module.exports= Thoughts;