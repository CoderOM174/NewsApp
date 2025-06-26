const mongoose = require('mongoose'); 
const mongURI = "your mongodb url"
const connectToMongo = () => {
    mongoose.connect(mongURI, { useNewUrlParser: true, useUnifiedTopology: true }) 
        .then(() => {
            console.log("Connected to MongoDB successfully");
        })
        .catch(err => {
            console.error("Error connecting to MongoDB:", err); 
        });
}

module.exports = connectToMongo;
