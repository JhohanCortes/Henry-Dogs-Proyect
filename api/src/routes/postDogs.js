const { Router } = require('express');
const { postDogs } = require('../controllers/postDogs.js')
const router = Router();

router.post('/', async (req, res) => {
    const { name, height, weight, age, image, temperament, created } = req.body;
    try {
        if(!name || !height || !weight || !age || !image || !temperament){
            throw Error("Put all the required information");
        } else {
            const newDog = await postDogs(name, height, weight, age, image, temperament, created)
            return res.status(201).json(newDog)
        }
    } catch (error) {
        return res.status(404).send(error.message);
    }
})

module.exports = router;
