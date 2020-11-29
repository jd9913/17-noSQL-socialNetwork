const { Users, Thoughts }=require('../models');

const thoughtController={
    //add thoughts to user

    addThought({ params, body }, res){
        console.log(body);
        Thoughts.create(body)
        .then(({ _id })=>{
            return Users.findOneAndUpdate(
                { _id: params.userId },
                { $push: { thoughts: _id } },
                { new: true }
            );
        })
        .then(dbUserData=>{
            if(!dbUserData){
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err=>res.json(err));
    },

    //remove thought

    removeThought({ params }, res){
        Users.findOneAndDelete({ _id: params.userId })
        .then(deletedThought=>{
            if(!deletedThought){
                return res.status(404).json({ message: "No thought with this id! "})
            }
            return Users.findOneAndUpdate(
                { _id: params.userId },
                { $pull: { thoughts: params.thoughtId } },
                { new: true }
            );
        })
        .then(dbUserData=>{
            if(!dbUserData){
                res.status(404).json({ message: "No user found with this id!"});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err=> res.json(err));
    }

};




module.exports=thoughtController;
