const cloudinary = require('cloudinary').v2;
const { cloudName, apiKey, apiSecret } = require('./config');


// Configuration 
const cloudnaryconf =cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret
});

module.exports={
  cloudnaryconf,
  cloudinary
}