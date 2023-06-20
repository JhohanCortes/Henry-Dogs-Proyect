const { Router } = require('express');
const router = Router();
const { getDogByName } = require('../controllers/getDogsByName')

router.get('/dogs', async (req, res) => {
    const name = req.query.name.toLowerCase()   // pasamos a minusculas para que coincida con la base de datos
    try {
        const dogs = await getDogByName(name);
        if (dogs.length) return res.status(200).json(dogs);
        res.status(404).json({ message: "There aren't dogs with that name" });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

module.exports = router