const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat'); //re-using file from the module project

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()

        },

        reactionBody: {
            type: String,
            required: true,
            maxlength: 280

        },

        username: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Users'
            }
        ],

        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        }, 
        id: false
    }
);

const ThoughtSchema = new Schema(
    {
    
    thoughtText: {
        type: String,
        required: true,
        maxlength: 280,
        minlength: 1
    },

    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    username: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Users'
        }
    ],

    reactions: [ReactionSchema]
},
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }

);

ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
})

//create the completed thoughts model with the schema

const Thoughts = model('Thoughts', ThoughtSchema);

module.exports = Thoughts;