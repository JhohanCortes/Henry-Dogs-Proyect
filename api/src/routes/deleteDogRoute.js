const { Router } = require('express');
const router = Router();
const { deleteDog } = require('../controllers/deleteDog.js')

router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const dog = await deleteDog(id);
        return res.status(200).json(`${dog.name} was be delete`)
    } catch (error) {
        res.status(404). send(error.message)
    }
})

module.exports = router;
