const router=require('express').Router();

const {
    getAllThoughts,
    addThought,
     getThoughtById,
     removeThought, 
    updateThought, 
     addReaction,
     removeReaction
    
    
    }=require('../../controllers/thought-controller');

// API: /api/thoughts
    router
    .route('/')
    .get(getAllThoughts)  //working
    .post(addThought);
    
//GET/PUT/DELETE thought by ID API: /api/thoughts/:id
router
.route('/:id')
.get(getThoughtById)  //working
.put(updateThought)  //not working
.delete(removeThought)

//API: /api/thoughts/:thoughtId/reactions

router
.route("/:thoughtId/reactions")
.post(addReaction)


// API: //api/thoughts/:thoughtId/reactions/:reactionId

router
.route('/:thoughtId/reactions/:reactionId')
.delete(removeReaction);






module.exports=router;