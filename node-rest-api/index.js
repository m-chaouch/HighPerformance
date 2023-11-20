const express = require("express");
const app = express ();

app.use(express.json()) // the middleware we use here ist express.json()
/**
 * each request coming in goes through express.json() and converts the body to json (else there would be an exception making a postrequest
 * (->making it available in callback)
 * not everyone uses express to build an
 */



const PORT = 8080;

app.listen(
    PORT,
    () => console.log(`its alive on http://localhost${PORT}`)
)

app.get('/tshirt', (req, res) => {  // req: incoming data, res: outgoing data -> our response to the request
    res.status(200).send({  // 200 statuscode because everything is okay!
        tshirt: 'polo ralph lauren',
        size: 'large'
    })
})

app.post('/tshirt/:id', (req, res) => { // user creates new data on the server

    const { id } = req.params;  // get id from url
    const { brand } = req.body; // brand is in the request body
    const { size } = req.body;  // size is in the request-body
    if(!size){
        res.status(418).send({message: 'We need the size!'})
    }

    res.send({
        tshirt: `the tshirt by ${brand} has the size ${size} and the id ${id}`
    });
});