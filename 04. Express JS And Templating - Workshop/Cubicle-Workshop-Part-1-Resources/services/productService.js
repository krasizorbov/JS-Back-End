const Cube = require('../models/product');
const uniqid = require('uniqid');
const fs = require('fs');
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
    await fs.writeFile('products.json', JSON.stringify(products), (err) => {
        if (err) {
            console.log(err);
            return;
        }
    });
}

module.exports = {create, getAll, getById};