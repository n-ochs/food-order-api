//Dependencies: npm, express, body-parser

//body-parser will detect if a request has a body and json, and it will parse it

const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const port = 3000;

//CRUD = create (post), read (get), update, delete

let orders = [];
let primaryId = 0;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));

//Routes below
app.post('/orders', (req, res) => {
    orders.push({
        id: primaryId,
        food_name: req.body.food_name,
        customer_name: req.body.customer_name,
        quantity: req.body.quantity
    });
    primaryId++;

    res.status(200).json({
        message: "Order created successfully"
    });
});

app.delete('/orders/:id', (req, res) => {
    const orderId = req.params.id;
    
});

app.get('/orders', (req, res) => {
    res.status(200).send(orders);
});



app.listen(port, () => {
    console.log('Server started');
});