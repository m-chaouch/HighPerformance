const mongoMock = require('mongo-mock');
const MongoClient = mongoMock.MongoClient;

/**
 * this file  explains how mongoMock works and can CREATE different and multiple DBs by provideing when calling  createDB different URLs 
 */

/**
 * 
 * @param {*} url provide an url which should be used by the mocked db
 * @returns a db objct which can be used for further interation (CRUD-testing, etc)
 */
async function createDB(url="localhost:27000/test" ){
    const connetionURL = `mongodb://${url}`;
    const mongoClient = await MongoClient.connect(connetionURL);
    return mongoClient.db();
}

async function closeDB(db){
    await db.client.close();
}

exports.createMockedDB = createDB;
exports.closeMockedDB = closeDB;





// Update One Document: updateOne(query, newValue)
/**
 * Example:
 * await collection.updateOne({ name: 'Alice' }, { $set: { age: 31 } });
 */

// Update Many Documents: updateMany(query, newValue)
/**
 * Example:
 * await collection.updateMany({ age: { $lt: 30 } }, { $set: { status: 'young' } });
 */

// Deleting Documents:

// Delete One Document: deleteOne(query)
/**
 * Example:
 * await collection.deleteOne({ name: 'Alice' });
 */

// Delete Many Documents: deleteMany(query)
/**
 * Example:
 * await collection.deleteMany({ age: { $lt: 30 } });
 */
exports.createDB = createDB;
exports.closeDB = closeDB;


  

