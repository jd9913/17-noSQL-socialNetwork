const router=require('express').Router();
const logger=require('../logger');


//Import all of the API routes from /api/index.js

const apiRoutes=require('./api');
//const htmlRoutes=require('./html/html-routes'); //for html front end

//add prefix of '/api' to all of the api routes imported from api directory

router.use('/api', apiRoutes);

//router.use('/', htmlRoutes);  //use for html front end

router.use((req, res)=> {
    res.status(404).send('<h1>😝 404 Error!</h1>');
});

router.use(function(req,res,next){
    const log=logger.loggerInstance.child({
        id: req.id,
        body: req.body
    }, true)
    log.info({ req: req})
    next();
    });

    router.use(function (req, res, next) {
        function afterResponse() {
            res.removeListener('finish', afterResponse);
            res.removeListener('close', afterResponse);
            var log = logger.loggerInstance.child({
                id: req.id
            }, true)
            log.info({res:res}, 'response')
        }
        res.on('finish', afterResponse);
        res.on('close', afterResponse);
        next();
    });

module.exports=router;