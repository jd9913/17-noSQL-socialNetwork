const router=require('express').Router();

//Import all of the API routes from /api/index.js

const apiRoutes=require('./api');
//const htmlRoutes=require('./html/html-routes'); //for html front end

//add prefix of '/api' to all of the api routes imported from api directory

router.use('/api', apiRoutes);

//router.use('/', htmlRoutes);  //use for html front end

router.use((req, res)=> {
    res.status(404).send('<h1>😝 404 Error!</h1>');
});



module.exports=router;