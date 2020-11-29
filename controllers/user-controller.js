const { Users } = require('../models');
const { populate } = require('../models/Users');


const userController= {
    
    //get all users

    getAllUsers(req, res){
        Users.find({ })
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1 })
            .then(dbUserData=>res.json(dbUserData))
            .catch(err=>{
                console.log(err);
                res.status(400).json(err);
            });
       
    },

    //get one user by id
    getUserById({ params }, res){
        Users.findOne({ _id: params.id })
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData=>{
            //if no user found, send 404
            if(!dbUserData){
                res.status(404).json({ message: "no user found with this id!" });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err=>{
            console.log(err);
            res.status(400).json(err);
        });
    },

    //create User

    createUser({ body }, res)
{
    Users.create(body)
    .then(dbUserData=>res.json(dbUserData))
    .catch(err=>res.status(400).json(err));
},
//update user by id

updateUser({ params, body }, res){
    Users.findOneAndUpdate({ _id:params.id }, body, {new: true})
    .then(dbUserData=>{
        if(!dbUserData){
            res.staus(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.json(dbUserData);
    
    })
    .catch(err=>res.status(400).json(err));
},

//delete user

deleteUser({ params }, res){
    Users.findOneAndDelete({ _id: params.id })
    .then(dbUserData=>{
        if(!dbUserData){
            res.status(404).json({ message: 'No user found with this id! '});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err=>res.status(400).json(err));
}

};


module.exports=userController;

