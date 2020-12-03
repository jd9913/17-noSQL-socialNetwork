const router=require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
     addThought,
     
     removeThought, 
    updateThought, 
     addReaction,
     removeReaction
    
    
    }=require('../../controllers/thought-controller');


    router
    .route('/')
    .get(getAllThoughts)
    .post(addThought);
    
//GET/PUT/DELETE thought by ID

router
.route("/:userId/:thoughtId")
.put(addReaction, updateThought)
.delete(removeThought);

// /api/thoughts/<userId>

router
.route('/:userId')
.post(addThought);


// /api/thoughts/<userId>/<thoughtId>


router
.route('/:userId/:thoughtId/:reactionId')
.delete(removeReaction);




module.exports=router;