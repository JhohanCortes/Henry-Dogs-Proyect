const { Router } = require('express');
const { getAllDogs } = require('../controllers/getAllDogs.js')
const { getDogByName } = require('../controllers/getDogsByName')
const router = Router();

router.get("/", async (req, res) => {
    const name = req.query.name   // pasamos a minusculas para que coincida con la base de datos
    const allDogs = await getAllDogs();
    try {
        if (name) {
            // const dogFound = await allDogs.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()))
            // dogFound.length ? res(200).send(dogFound) : res(404).json({msg: "not Found!"})
            name.toLowerCase()
            const dogs = await getDogByName(name);
            if (dogs.length) return res.status(200).json(dogs);
            res.status(404).json({ message: "There aren't dogs with that name" });
        } else return res.status(200).send(allDogs)
    } catch (error) {
        return res.status(404).send(error.message)
    }
})

module.exports = router;
