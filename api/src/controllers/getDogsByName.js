const { getAllDogs } = require('./getAllDogs')
const { getDbDogs } = require('./getDbDogs')

const getDogByName = async (name) => {
    const allDogs = await getAllDogs();
    const dbDogs = await getDbDogs();
    return [...allDogs, ...dbDogs].filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()));
};

module.exports = {
    getDogByName,
}
