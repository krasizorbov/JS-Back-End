const { body } = require('express-validator');

module.exports = [
    body('name').isLength({min: 4}).withMessage("Name must be at least 4 characters long!"),
    body('city').isLength({min: 3}).withMessage("City must be at least 3 characters long!"),
    body('freeRooms').isFloat({min: 1, max: 100}).withMessage("Free rooms must be a number between 1 and 100!"),
    body('imageUrl').isURL().withMessage("Invalid URL!")
]