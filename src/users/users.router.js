const router = require('express').Router()
const passport = require('passport')
const adminValidate=require('../middlewares/role.middleware')

const userServices = require('./users.services')

require('../middlewares/auth.middleware')(passport)

//? rutas raiz

router.get('/',
// passport.authenticate('jwt', {session: false}) , 
userServices.getAllUsers)

//TODO el registerUser ira en la ruta /auth/register

//! router.route('/').get( userServices.getAllUsers)

//? rutas dinamicas por ID /users/:id

//! router.get('/:id')
//! router.patch('/:id')
//! router.put('/:id')
//! router.delete('/:id')


//? ruta de informacion propia del usuario loggeado
router.route('/me')
    .get(
        passport.authenticate('jwt', {session: false}) ,
        userServices.getMyUser)        
    .patch(
        passport.authenticate('jwt', {session: false}) ,
        userServices.patchMyUser) 
    .delete(
        passport.authenticate('jwt', {session: false}) ,
        userServices.deleteMyUser) 
   

//? /api/v1/users/:id
router.route('/:id')
    .get(       
        userServices.getUserById)
    .patch(
        passport.authenticate('jwt', {session: false}) ,  
        adminValidate,      
        userServices.patchUser)
    .delete(
        adminValidate,
        passport.authenticate('jwt', {session: false}) ,                
        userServices.deleteUser)

module.exports = router