const axios = require('axios');

const baseUrl = 'https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX';
const credentials = {
    username: 'guest',
    password: 'guest',
    };

const config = {
    headers: {
        'Accept': 'application/json'
    },
    auth: credentials,
};
async function test(){
    const contacts = await
        axios.get(`${baseUrl}/org.opencrx.kernel.account1/provider/CRX/segment/Standard/account`, config);
}
test();

