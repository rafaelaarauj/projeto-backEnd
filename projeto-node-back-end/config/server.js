const express = require('express');

const consign = require('consign');

const bodyParser = require('body-parser') ;

const server = express();

server.use(bodyParser.json());

consign().include('controllers').into(server);

server.get('/hello',(request, response) => {
    console.log('Acessando rota de teste');
    response.status(200);
    response.send("Olá mundo!!");
});

module.exports = server;