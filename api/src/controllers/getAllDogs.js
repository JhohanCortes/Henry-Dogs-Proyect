const { getApiDogs } = require('./getApiDogs');
const { getDbDogs } = require('./getDbDogs');

const getAllDogs = async () => {
  const apiDogs = await getApiDogs();
  const dbDogs = await getDbDogs();
  const allDogs = [...apiDogs, ...dbDogs];
  return allDogs;
};

module.exports = {
  getAllDogs,
};
