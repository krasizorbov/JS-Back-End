const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const emailValidator = require('email-validator');
const jwt = require('jsonwebtoken');

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    validate: {
      validator: emailValidator.validate,
      message: '{VALUE} is not a valid email',
    }
  },

  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    maxlength: 20,
    minlength: 4,
  },

  password: {
    type: String,
    required: true,
    minlength: 6,
  },

  tokens: [
    {
      access: {
        type: String,
        required: true,
      },
      token: {
        type: String,
        required: true,
      },
    }
  ]
});

UserSchema.methods.generateAuthToken = function generateAuthToken() {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({ _id: user._id.toHexString(), access }, 'abc123').toString();

  user.tokens = user.tokens.concat([{ access, token }]);

  return user.save().then(() => token);
};

UserSchema.methods.toJSON = function () {
  var user = this;
  var userObj = user.toObject();

  return { _id: userObj._id, email: userObj.email, username: userObj.username, password: userObj.password };
};

UserSchema.statics.findByToken = function (token) {
  var User = this;
  var decodedToken;

  try {
    decodedToken = jwt.verify(token, 'abc123');
  } catch (error) {
    return Promise.reject(error);
  }

  return User.findOne({
    '_id': decodedToken._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

UserSchema.statics.findByCredentials = function (email, password) {
  var User = this;

  return new Promise((resolve, reject) => {
    return User.findOne({ email })
      .then(user => {
        if (!user) {
          reject();
        }

        bcrypt.compare(password, user.password, (err, res) => {
          if (res) {
            resolve(user);
          } else {
            reject(err);
          }
        })
      })
    });
};

function hashPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        reject(err);
      }

      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          reject(err);
        }

        resolve(hash);
      });
    });
  });
}

UserSchema.pre('save', function(next) {
  var user = this;

  if (user.isModified('password')) {
    hashPassword(user.password)
      .then((hashedPassword) => user.password = hashedPassword)
      .then(() => next());
    } else {
    next();
  }
});

module.exports = model('User', UserSchema);