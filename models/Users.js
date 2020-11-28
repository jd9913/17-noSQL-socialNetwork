const { Schema, model } = require('mongoose');

const UsersSchema = new Schema({
    username: {
        type: String

    },
    email: {
        type: String
    },

    thoughts: {
        type: String
    },

    friends: {
        type: String
    }
});

//get total count of friends
UsersSchema.virtual('friendCount').get(function(){
    return this.friends.length;
})

const Users = model('Users', UsersSchema);

module.exports = Users;
