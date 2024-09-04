

function getLastSegment(URL) {     // gets the last segment of the URL of the salesRep attribute (= UID = "SellerID").
    return URL.substring(URL.lastIndexOf('/')+1);
}

module.exports = {
    getLastSegment
}