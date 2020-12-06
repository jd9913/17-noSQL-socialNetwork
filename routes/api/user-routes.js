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


//set up GET all and POST at /api/users

router
.route('/')
.get(getAllUsers)  //working
.post(createUser);  //working


// /api/users/:id  
router
.route('/:id')
.get(getUserById)  // working
.put(updateUser)  //working
.delete(deleteUser);  //working


// API: /api/users/:userId/friends/:friendId
router
.route("/:userId/friends/:friendId")
.post(addFriend)  //working
.delete(deleteFriend);//not working--no user found with this id

module.exports=router;

