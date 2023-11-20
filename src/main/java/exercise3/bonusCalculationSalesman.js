const axios = require('axios'); // global variable


//Orange 
function getAccount(id){

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.account1/provider/CRX/segment/Standard/account/${id}', //returns the data of the corresponding id form OpenCRX 
        headers: {
            'Authorization': 'Basic Z3Vlc3Q6Z3Vlc3Q='
        }
    };

    axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
            console.log(error);
        });

}



function getProduct(id){
 

    let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.product1/provider/CRX/segment/Standard/product/${id}',
    headers: { 
        'Authorization': 'Basic Z3Vlc3Q6Z3Vlc3Q=', 
        'Cookie': 'JSESSIONID=555C038725228401566EB87BA4580FF5'
    }
    };

    axios.request(config)
    .then((response) => {
    console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
    console.log(error);
    });

}

function getSalesOrder(id){


    let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.contract1/provider/CRX/segment/Standard/salesOrder',
    headers: { 
        'Authorization': 'Basic Z3Vlc3Q6Z3Vlc3Q=', 
        'Cookie': 'JSESSIONID=555C038725228401566EB87BA4580FF5'
    }
    };

    axios.request(config)
    .then((response) => {
    console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
    console.log(error);
    });

}

//OrangeHRM
function getToken(){

const FormData = require('form-data');
let data = new FormData();
data.append('client_id', 'api_oauth_id');
data.append('client_secret', 'oauth_secret');
data.append('grant_type', 'password');
data.append('username', 'demouser');
data.append('password', '*Safb02da42Demo$');

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://sepp-hrm.inf.h-brs.de/symfony/web/index.php/oauth/issueToken',
  headers: { 
    'Cookie': 'Loggedin=True; PHPSESSID=f4eolttd4fikqrvishi84ff2k1', 
    ...data.getHeaders()
  },
  data : data
};

axios.request(config)
.then((response) => {
    return JSON.pars(JSON.stringify(response.data)).access_token;
})
.catch((error) => {
  console.log(error);
});

}


function getEmployee(id){
    let  token = getToken();

    let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://sepp-hrm.inf.h-brs.de/symfony/web/index.php/api/v1/employee/search/${id}',
    headers: { 
        'Authorization': 'Bearer ${token}'
    }
    };

    axios.request(config)
    .then((response) => {
    console.log(JSON.pars(JSON.stringify(response.data)));
    })
    .catch((error) => {
    console.log(error);
    });

}





