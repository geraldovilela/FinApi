const express = require('express');
const { v4: uuidv4 } = require('uuid');


const app = express();
app.use(express.json())

const customers = [];

app.post("/account", (request, response) => {
    const { cpf, name } = request.body;

    const custormeAlreadyExists = customers.some(
        (customers) => 
        customers.cpf === cpf
    );

    if (custormeAlreadyExists) {
        return response.status(400).json({ error: "This CPF is already in use!" });
    }

    customers.push({
        id: uuidv4(),
        cpf,
        name,
        statement: []
    });
    console.log(customers);
    return response.status(201).send();
});

app.listen(3333);