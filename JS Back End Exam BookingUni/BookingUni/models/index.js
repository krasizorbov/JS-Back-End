const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const getUserModel = require('./User');
const getHotelModel = require('./Hotel');

module.exports = {
    User: getUserModel(mongoose, bcrypt),
    Hotel: getHotelModel(mongoose)
};