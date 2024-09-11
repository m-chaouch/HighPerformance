var mongodb = require('mongo-mock');
mongodb.max_delay = 0;//you can choose to NOT pretend to be async (default is 400ms)
var MongoClient = mongodb.MongoClient;


// Connection URL
var url = 'mongodb://localhost:27017/myproject';
// Use connect method to connect to the Server

  var db;
  MongoClient.connect(url)
  .then(mongoClient => {
    // db = mongoClient.db()
    mongoClient.close();
  })