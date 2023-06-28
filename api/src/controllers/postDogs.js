const { Dog, Temperament } = require('../db.js');
const { Op } = require('sequelize');
const { getAllTemps } = require('./getAllTemps.js');

const postDogs = async (name, height, weight, age, image, temperament, created) => {
    const dogIn= await Dog.findAll({
        where: {
            name: {
                [Op.iLike]: `%${name}%`,
            },
        },
    })
    console.log(dogIn)
    if(dogIn.length) throw new Error ("A dog is already with that name");

    const newDog = await Dog.create({
        name: name,
        height: height,
        weight: weight,
        age: age,
        image: image,
        created: true
    })

    const temperamentCount = await Temperament.count();
    if (temperamentCount === 0) {
        await getAllTemps()
    }
    const tempsFound = []
    for (let i = 0; i < temperament.length; i++) {
        const tempFound = await Temperament.findOne({ where: {name: temperament[i] } })
        if(!tempFound) {
            throw new Error(`${temperament[i]} no existe`)
        }
        tempsFound.push(tempFound);
    }
    await newDog.addTemperament(tempsFound)
    console.log("Perros creados: " +newDog)
    return newDog
}

module.exports = {
    postDogs
}