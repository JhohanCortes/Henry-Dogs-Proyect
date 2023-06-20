const { Dog } = require('../db')

const deleteDog = async (id) => {
    if (!id) {
        throw new Error("we don't know this dog D:")
    } else if (typeof id === 'number') throw new Error("You can't delete this dog")
    const foundDog = await Dog.findByPk(id)

    foundDog.destroy({
        where: { id: id}
    })
    return foundDog
}

module.exports = {
    deleteDog
}