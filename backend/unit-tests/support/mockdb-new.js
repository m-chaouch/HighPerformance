const mongoMock = require('mongo-mock');
const MongoClient = mongoMock.MongoClient;

/**
 * This file demonstrates how `mongo-mock` works and how to create
 * different and multiple databases by providing different URLs
 * when calling `createDB`.
 */

/**
 * Creates a mock database connection.
 * 
 * @param {string} [url="localhost:27000/test"] - The URL to use for the mocked database.
 * @returns {Promise<object>} - A promise that resolves to a mock database object for further interactions (CRUD testing, etc).
 */
async function createDB(url = 'localhost:27000/test') {
    const connectionURL = `mongodb://${url}`;
    const mongoClient = await MongoClient.connect(connectionURL);
    let db = mongoClient.db();
    db.client = mongoClient;
    return db;
}

/**
 * Closes the mock database and client connections.
 * 
 * @param {object} db - The mock database object to close.
 */
function closeDB(db) {
    try {
        db.close(); // Close the mock database
        db.client.close(); // Close the mock client
    } catch (error) {
        console.error('Error closing the database:', error); // Log any errors that occur
    }
}

// Export functions for use in other modules
exports.createDB = createDB;
exports.closeDB = closeDB;

// CRUD Operations Examples:

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
