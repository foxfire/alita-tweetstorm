const { MongoClient } = require('mongodb');

//Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);


// Database Name
const dbName = 'tweetstorm';

module.exports = {
    dbName: dbName,
    client: client
};