const router=require('express').Router();

const {
    getAllUsers, 
    getUserById,
    createUser, 
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend

}= require('../../controllers/user-controller');

// const { create } = require('../../models/Users');




//set up GET all and POST at /api/users


router
.route('/')
.get(getAllUsers)
.post(createUser);


// /api/users/:id
router
.route('/:id')
.get(getUserById)
.put(updateUser)
.delete(deleteUser);


router
.route("/:id/friend/:friendId")
.post(addFriend)
.delete(deleteFriend);

module.exports=router;

