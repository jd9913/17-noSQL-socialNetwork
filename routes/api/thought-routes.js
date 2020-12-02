const router=require('express').Router();

const {
     addThought,
     removeThought, 
     getAllThoughts,
     getThoughtById,
     updateThought, 
     addReaction,
     removeReaction
    
    
    }=require('../../controllers/thought-controller');

//GET at api/thoughts
    router
    .route('/')
    .get(getAllThoughts);
    
//GET/PUT/DELETE thought by ID

router
.route("/:id")
.get(getThoughtById)
.put(updateThought)
.delete(removeThought);

// /api/thoughts/<userId>

router
.route('/:userId')
.post(addThought);


// /api/thoughts/<userId>/<thoughtId>

router
.route('/:thoughtId/reactions')
.post(addReaction);

router
.route('/:thoughtId/:reactionId')
.delete(removeReaction);




module.exports=router;