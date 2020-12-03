const router=require('express').Router();
const userRoutes=require('./user-routes');
const thoughtRoutes=require('./thought-routes.js');

const swaggerUi=require('swagger-ui-express');
const swaggerJSDoc=require('swagger-jsdoc');
const swaggerDocument=require('../../Documentation/swagger.json');



//add prefix of '/users' to routes created in 'user-routes.js'

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs',  swaggerUi.setup(swaggerDocument, { explorer: true }));






module.exports=router;