const mongoose = require('mongoose');

const mongoUrl = process.env.MONGODB_URI;

console.log('connecting to', mongoUrl);

mongoose.connect(mongoUrl)
  .then(result => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  });

const countrySchema = new mongoose.Schema({
  name: String,
  population: Number,
  area: Number
});

countrySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
});

module.exports = mongoose.model('Country', countrySchema);
