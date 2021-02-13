const {validationResult} = require('express-validator');

 module.exports = (req) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log("error");
        return {
            options: {
                ...req.body,
                message: `${errors.array()[0].msg}`
            },
            isOk: false
        }
    }
    return {isOk: true};
 }