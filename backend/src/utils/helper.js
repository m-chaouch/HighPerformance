const fs = require('fs');
const path = require('path');

// Define paths to JSON files
const pathToRating = './ratingToNumber.json';
const pathToSocialFactors ='./socialScoreFactors.json';
const pathSocialPer = './defualtsForSocialPerformance.json';


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
 * Reads JSON data from a file and optionally filters for a specific attribute.
 * @param {string} filterForAttribute - The attribute to filter, if any.
 * @param {string} pathToJson - The file path to the JSON file.
 * @returns {Object|any} - The entire JSON object or a filtered attribute.
 */
function readJson(filterForAttribute, pathToJson) {
    const filePath = path.join(__dirname, pathToJson);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const dataFromFile = JSON.parse(fileContent);
    return filterForAttribute ? dataFromFile[filterForAttribute] : dataFromFile;
}

/**
 * Updates JSON data in a file with new values for existing keys.
 * @param {Object} newValues - New values to update in the JSON file.
 * @param {string} pathToJson - The file path to the JSON file.
 */
function updateJson(newValues, pathToJson) {
    if (!newValues) throw new Error("No update object given");

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
 * Reads and optionally filters rating conversion data from JSON.
 * @param {string} specificRating - Specific rating to filter, if any.
 * @returns {any} - The rating conversion data, either filtered or whole.
 */
function readRatingConversion(specificRating) {
    return readJson(specificRating, pathToRating);
}

/**
 * Updates the rating-to-number data in the JSON file.
 * @param {Object} newValues - New values for the rating data.
 */
function updateRatingToNumber(newValues) {
    updateJson(newValues, pathToRating);
}

/**
 * Reads social scores from a JSON file.
 * @returns {Object} - Social score data.
 */
function readSocialScores() {
    return readJson(null, pathToSocialFactors);
}

/**
 * Updates social factors in the JSON file, filtering out null and undefined values first.
 * @param {Object} newValue - New values to update.
 */
function updateSocialFactors(newValue = {bonusFactor, additionalBonus}) {
    const filteredValues = copyNonNullUndefined(newValue);
    updateJson(filteredValues, pathToSocialFactors);
}

/**
 * Filters an object, removing any properties that are null or undefined.
 * @param {Object} obj - The object to filter.
 * @returns {Object} - A new object with only non-null, non-undefined properties.
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

/**
 * Reads default values for social performance from a JSON file.
 * @returns {Object} - Default values for social performance.
 */
function defaultValueSocialPer() {
    return readJson(null, pathSocialPer);
}

/**
 * Updates default values for social performance in the JSON file.
 * @param {Object} newValues - New values to update.
 */
function updateValuesSocialPer(newValues) {
    updateJson(newValues, pathSocialPer);
}

// Export functions for use in other modules.
module.exports = {
    getLastSegment,
    readRatingConversion, updateRatingToNumber,
    readSocialScores, updateSocialFactors,
    defaultValueSocialPer, updateValuesSocialPer
};
