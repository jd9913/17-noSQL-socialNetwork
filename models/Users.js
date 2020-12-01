const { Schema, model } = require('mongoose');

const UsersSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true

    },
    email: {
        type: String,
        required: true,
        unique: true,
        match:[/ ^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/ ]
       
    },

    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thoughts'
        }
    ],

    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Users'
        } 
    ]

},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
}
);

//get total count of friends on retrieval

UsersSchema.virtual('friendCount').get(function () {
    return this.friends.length;
})

const Users = model('Users', UsersSchema);

module.exports = Users;
