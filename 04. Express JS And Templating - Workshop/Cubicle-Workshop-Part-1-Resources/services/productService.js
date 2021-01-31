const Cube = require('../models/product');
const uniqid = require('uniqid');
const fs = require('fs').promises;
let products = require('../products.json');

function getAll(){
    return products;
}

function getById(id){
    return products.find(x => x.id === id);
}

async function create(data){
    let cube = new Cube(uniqid(), data.name, data.description, data.imageUrl, data.difficultyLevel);
    products.push(cube);
    // Use the "path" library to configure the path with "path.join" or "path.resolve"
    // With async await
    try {
        await fs.writeFile('products.json', JSON.stringify(products));
    } catch (error) {
        console.log(error);
    }

    // With a Promise
    // fs.writeFile('products.json', JSON.stringify(products))
    // .then(() => {
    //     console.log('JSON saved');
    // })
    // .catch(er => {
    //     console.log(er);
    // });
}

module.exports = {create, getAll, getById};