const mongoose = require('mongoose');
const Joi = require('joi');

const schemaUser = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 3
  }
});

const User = mongoose.model('users', schemaUser);

function validate_user(user) {
  const schema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required()
  });
  return schema.validate(user);
}

module.exports = { User, validate: validate_user };



