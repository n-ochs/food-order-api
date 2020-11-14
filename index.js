//Dependencies: npm, express, body-parser

//body-parser will detect if a request has a body and json, and it will parse it. body-parser is actually not needed anymore, you can just use express.

const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const port = 3000;

//CRUD = create (post), read (get), update, delete

let orders = [];
let primaryId = 1;

// With body-parser
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));

// Without body-parser
// app.use(express.json());
// app.use(express.urlencoded({extended: false}));

//Routes below

app.get('/orders', (req, res) => {
    res.status(200).send(orders);
});

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
    const id = req.params.id;

    let order = orders.find((order) => {
        return order.id === Number(id);
    });

    let orderIndex = orders.findIndex((o) => {
        return o === order;
    });

    //If nothing is found in the array, JS returns -1 as the index, so we need to check for -1 below

    if (orderIndex > -1) {
        orders.splice(orderIndex, 1);
    };
    res.status(200).send(orders);
});

app.get('/orders/:id', (req, res) => {
    const id = req.params.id;
    let order = orders.find((order) => {
        return order.id === Number(id);
    });
    res.status(200).send(order);
});

app.get('*', (req, res) => {
    res.status(404).send('Not found');
});

app.listen(port, () => {
    console.log('Server started');
});