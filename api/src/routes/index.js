const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const getAllDogsRoute = require('./getAllDogs')
const getAllDogsByIdRoute = require('./getDogsById')
// const getDogByNameRoute = require('./getDogByName')
const postDogsRoute = require('./postDogs.js')
const deleteDogRoute = require('./deleteDogRoute.js')
const getAllTempsRoute = require('./getAllTemps.js')
const getRandomDog = require('./getRandomDog.js')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/dogs', getAllDogsRoute, getRandomDog, getAllDogsByIdRoute, postDogsRoute, deleteDogRoute, getRandomDog)
router.use('/temps', getAllTempsRoute)




module.exports = router;