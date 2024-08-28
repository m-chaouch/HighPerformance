const axios = require('axios');


const credentials =
    {
        username: 'guest',
        password: 'guest',
    };


/**
 * Adds the "auth" header to the HTTP request to enable authentication. This header is required for each request,
 * which is why this function is used.
 *
 * Currently, the login is hardcoded with static credentials as a temporary solution. This function will be updated
 * once the login mechanism is finalized.
 *
 * @param {string} URL - The URL for the HTTP request.
 * @returns {Promise<void>} A promise that resolves when the request is completed.
 */

async function loginService(URL) {
    try {
        const res = await axios.get(URL, {
            auth: credentials
        });
        return res.data

    } catch(error){
        console.error(error);
    }
}


module.exports = {
    loginService
}

//toDO: -dehardcode the login
