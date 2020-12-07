const { Users, Thoughts, Reactions } = require('../models');
const { populate } = require('../models/Thoughts');

const thoughtController = {

    //get all the thoughts

    getAllThoughts(req, res) {
        Thoughts.find({})
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-_v')
            .sort({ _id: -1 })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch((err) => {
                res.status(500).json(err);
            });
    },

    //get one thought by ID

    getThoughtById({ params }, res) {
        Thoughts.findOne({ _id: params.id })
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(dbThoughtData => {
                //if no user found, send 404
                if (!dbThoughtData) {
                    res
                        .status(404)
                        .json({ message: "no thoughts found with this id!" });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },


    //add thoughts to user

    addThought({ params, body }, res) {
        console.log(body);
        Thoughts.create(body)
            .then(({ _id }) => {

                return Users.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                )
               
            })
            
            .then(dbUserData => {
                console.log(dbUserData);
                if (!dbUserData) {
                    res
                        .status(404)
                        .json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch((err) => {
                console.log(err);
                res
                    .status(500)
                    .json(err);
            });
    },

    updateThought({ params, body }, res) {
        Thoughts.findOneAndUpdate({ _id: params.id }, body, {
            new: true
            
        })
            .populate({
                path: "reactions",
                select: "-__v"
            })
            .select("-__v")
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res
                        .staus(404)
                        .json({ message: 'No thoughts found with this id!' });

                    return;
                }
                res.json(dbThoughtData);

            })
            .catch((err) => {
                console.log(err);
                res
                    .status(400)
                    .json(err)
            });
    },
    //remove thought

    removeThought({ params }, res) {
        Thoughts.findOneAndDelete({ _id: params.id })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res
                        .status(404)
                        .json({ message: "No thought with this id! " })
                    return;
                }
                return Users.findOneAndUpdate(
                    { _id: params.userId },
                    { $pull: { thoughts: params.thoughtId } },
                    {new: true }
                );
                
            })
.then(dbUserData=>{
    if(!dbUserData){
        res
        .status(404)
        .json({ message: "No user found with this id" } );
        return;
    }
    res.json(dbUserData);
})
            .catch((err) => {
                console.log(err);
                res
                    .status(500)
                    .json(err)
            });
    },


    addReaction({ params, body }, res) {
        console.log({params});
        console.log({body});
        Reactions.create(body)
        .then(({ _id })=>{

            console.log({ _id });
            
            return Thoughts.findOneAndUpdate(
                { _id: params.thoughtId },
                { $push: { reactions: _id } },
                { new: true }
                        
            )
            .populate({
                path:'reactions',
                select:('-__v')
            })
            .select('-__v')
               .then(dbThoughtData => {
                    if (!dbThoughtData) {
                        res
                        .status(404)
                        .json({ message: 'No thoughts found with this id!' });
                        return;
                    }
                    res
                    .json(dbThoughtData);
                })
                .catch((err) => {
                    console.log(err);
                    res
                        .status(500)
                        .json(err)
                });
        })

    },


    removeReaction({ params }, res) {
        Thoughts.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res
                    .status(404)
                    .json({ message: "No thought with this id! " })
                return;
            }
            res.json(dbUserData);
        })

        .catch((err) => {
            console.log(err);
            res
                .status(500)
                .json(err)
        });
    }

};




module.exports = thoughtController;
