const { getApiDogs } = require('./getApiDogs.js')
const { getDbDogs } = require('./getDbDogs.js')

const getAllDogs = async () => {
    const apiDogs = await getApiDogs();
    let dbDogs = await getDbDogs();
    const allDogs= apiDogs.concat(dbDogs)
    return allDogs
}

module.exports = {
    getAllDogs
}