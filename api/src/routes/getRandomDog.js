const express = require("express");
const router = express.Router();
const axios = require('axios')
const { getAllDogs } = require('../controllers/getAllDogs')

// Ruta GET para obtener un número de ID aleatorio
router.get("/random", async (req, res) => {
    const allDogs = await getAllDogs()
    try {
        const response = await axios.get("http://localhost:3001/dogs");
        const dogs = response.data;
        const randomIndex = Math.floor(Math.random() * dogs.length);
        const randomId = dogs[randomIndex].id;
        
        const dogId = await allDogs.find(dog => dog.id == (randomId))

        return res.status(201).json(dogId);
    } catch (error) {
        return res.status(404).send(error.message);
    }
});

module.exports = router;
