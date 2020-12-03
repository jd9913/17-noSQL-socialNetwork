const { Schema, model } = require('mongoose');

/**
 * @swagger
 * components:
 *  schemas:
 *      Users:
 *          type: Object
 *              required:
 *                  -username
 *                  -email
 *              optional:
 *                  -thoughts
 *                  -friends
 *          properties:
 *              name:
 *                  type: String
 *              email:
 *                  type: String
 *                  format: email
 *                  description: Unique email for the user
 *              thoughts:
 *                  type: Object
 *                  format: text
 *                  description: Thoughts of the user, including friends reactions
 *              friends:
 *                  type: String
 *                  description: array of userId of other users listed as friends
 *          example:
 *              username: mathwhiz
 *              email: mathwhiz@email.com
 *              thoughts: [thoughtSchema]
 *                  
 *                  
 */



const UsersSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique:true

    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
       
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
