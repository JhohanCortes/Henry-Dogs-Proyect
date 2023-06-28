const { getAllDogs } = require('./getAllDogs');

const getDogByName = async (name) => {
  const allDogs = await getAllDogs();
  const matchingDogs = allDogs.filter((dog) =>
    dog.name.toLowerCase().includes(name.toLowerCase())
  );
  return matchingDogs;
};

module.exports = {
  getDogByName,
};
