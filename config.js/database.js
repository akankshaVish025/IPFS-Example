// const mongoose = require("mongoose");
// const { MONGO_URI } = process.env;

// exports.connect = () => {
//     // Connecting to the database
//     mongoose.connect(MONGO_URI, {
//         useNewUrlParser: true,  // allows the MongoDB driver to use the new UrlParser to parse MongoDB connection strings. This is required when connecting to MongoDB Atlas, the MongoDB cloud database service, as the legacy parser is no longer supported.
//         useUnifiedTopology: true,  // enables the new unified topology engine of the MongoDB driver. This provides a new, more efficient way of managing MongoDB connections and is recommended for use with modern MongoDB servers.
//         // useCreateIndex: true,  //  tells Mongoose to use createIndex(). It is used to create an index on a collection. An index is a data structure that stores a subset of the data in a collection in an efficient way, allowing for faster queries and data retrieval.
//         // useFindAndModify: false  // allows the use of findOneAndUpdate() and findOneAndDelete() methods. By default, Mongoose uses the findAndModify() method, which is deprecated and will be removed in a future version of MongoDB. This option should be set to false to use MongoDB's native findOneAndUpdate() and findOneAndDelete() methods instead.
//     }).then(() => {
//         console.log("Connection Successfull !");
//     }).catch((error) => {
//         console.log("database connection failed. exiting now...");
//         console.error(error);
//         process.exit(1);
//     });
// }

const mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017/test';

exports.connect = () => {
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected'))
  .catch(err => console.log('Database connection failed. Error:', err));
}