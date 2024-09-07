const fs = require('fs');
const path = require('path');

// Define paths to JSON files
const pathToRating = './ratingToNumber.json';
const pathToSocialFactors ='./socialScoreFactors.json';


/**
 * Extracts the last segment from a URL.
 * This is typically used to retrieve the UID (SellerID) of a sales representative.
 * @param {string} URL - The URL from which to extract the last segment.
 * @returns {string} The last segment of the URL.
 */
function getLastSegment(URL) {     // gets the last segment of the URL of the salesRep attribute (= UID = "SellerID").
    return URL.substring(URL.lastIndexOf('/')+1);
}

/**
 * Reads and optionally filters JSON data from a file.
 * @param {string} filterForAttribute - Specific attribute to filter from JSON object.
 * @param {string} pathToJson - Path to the JSON file.
 * @returns {Object|any} The entire JSON object or a filtered attribute.
 */
function readJson(filterForAttribute, pathToJson) {
    const filePath = path.join(__dirname, pathToJson);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const dataFromFile = JSON.parse(fileContent);
    return filterForAttribute ? dataFromFile[filterForAttribute] : dataFromFile;
}

/**
 * Updates JSON data in a file with new values.
 * @param {Object} newValues - The new values to update in the JSON file.
 * @param {string} pathToJson - Path to the JSON file.
 */
function updateJson(newValues, pathToJson) {
    if (!newValues) {
        throw new Error("No update object given");
    }

    const filePath = path.join(__dirname, pathToJson);
    const jsonData = readJson(null, pathToJson);

    Object.keys(newValues).forEach(key => {
        if (jsonData.hasOwnProperty(key)) {
            jsonData[key] = newValues[key];
        }
    });

    const updatedJsonContent = JSON.stringify(jsonData, null, 2);
    fs.writeFileSync(filePath, updatedJsonContent, 'utf8');
}

/**
 * Reads rating conversion data, optionally filtering for a specific rating.
 * @param {string} specificRating - Specific rating to retrieve.
 * @returns {any} The rating conversion data, either filtered or whole.
 */
function readRatingConversion(specificRating) {
    return readJson(specificRating, pathToRating);
}

/**
 * Updates the rating-to-number JSON data.
 * @param {Object} newValues - New values to update in the rating JSON.
 */
function updateRatingToNumber(newValues) {
    updateJson(newValues, pathToRating);
}

/**
 * Reads the social scores from the JSON file.
 * @returns {Object} The entire social score data.
 */
function readSocialScores() {
    return readJson(null, pathToSocialFactors);
}

/**
 * Updates the social factors in the JSON file after filtering out null and undefined values.
 * @param {Object} newValue - New values to update, provided as an object.
 */
function updateSocialFactors(newValue = {bonusFactor, additionalBonus}) {
    const filteredValues = copyNonNullUndefined(newValue);
    updateJson(filteredValues, pathToSocialFactors);
}

/**
 * Filters an object by removing any properties that are null or undefined.
 * @param {Object} obj - The object to filter.
 * @returns {Object} A new object containing only non-null and non-undefined properties.
 */
const copyNonNullUndefined = (obj) => {
    let result = {};
    Object.keys(obj).forEach(key => {
        if (obj[key] !== null && obj[key] !== undefined) {
            result[key] = obj[key];
        }
    });
    return result;
};

// Export functions
module.exports = {
    getLastSegment,
    readRatingConversion,
    updateRatingToNumber,
    readSocialScores,
    updateSocialFactors
};
// Example usage
console.log(readRatingConversion()); // Reading and printing conversion ratings
console.log(readSocialScores()); // Reading and printing social scores
updateSocialFactors({bonusFactor: 25}); // Updating social factors
console.log(readSocialScores()); // Reading and printing updated social score
