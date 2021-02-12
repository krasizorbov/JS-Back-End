const { body } = require('express-validator');

module.exports = [
    body('title')
    .isLength({min: 4}).withMessage("Title must be at least 4 characters long!"),
    body('description')
    .isLength({min: 20}).withMessage("Description must be at least 20 characters long!"),
    body('imageUrl')
    .match(/[http|https]/).withMessage("Image URL must start with http or https!"),
]
