const { response } = require('express');
const banco = require('../config/database');

module.exports = server => {
    
    const urlBase = `/carro`;

    server.post(`${urlBase}/cadastro`, (resquest, response) => {
        console.log('Novo carro sendo cadastrado: ', resquest.body.placa_do_carro);

        const sql = `INSERT INTO estacionamento(placa_do_carro) VALUES(?)`;
        
        banco.DB.run(sql,[resquest.body.placa_do_carro], (err) => {
            if(err) {
                response.send("Error ao inserir o cadastro");
                response.status(500);
                console.error(err.message);
            } else {
                console.log("Novo carro adicionado");
                response.status(201);
                response.send("Novo carro adicionado com sucesso: " + resquest.body.id);
            }
        });
    });
    server.get(`${urlBase}/listar`, (resquest, response) => {

        const sql = `SELECT id, placa_do_carro, valor_pago, hora_de_entrada, hora_de_saida FROM estacionamento 
                      ORDER BY id`;

        banco.DB.all(sql, [], (err, rows) => {
            if (err) {
                response.send("Error ao listar todos os carros do estacionamento");
                response.status(500);
                throw err;
            }
            console.log("Carros do estacionamento localizado");
            response.status(200);
            response.send(rows);
        });
    });
    server.get(`${urlBase}/listar/:id`, (req, res) => {

        const sql = `SELECT placa_do_carro, valor_pago FROM produtos 
                     WHERE id = ?`;

        banco.DB.each(sql, [req.params.id], (err, row) => {
            if (err) {
                res.send("Error ao listar o carro");
                res.status(500);
                throw err;
            }
            console.log("carro localizado");
            res.status(200);
            res.send(row);
        });
    });
    server.get(`${urlBase}/listar/:placa_do_carro`, (req, res) => {

        const sql = `SELECT id, valor_pago FROM produtos 
                     WHERE placa_do_carro = ?`;

        banco.DB.each(sql, [req.params.placa_do_carro], (err, row) => {
            if (err) {
                res.send("Error ao listar os carros do estacionamento");
                res.status(500);
                throw err;
            }
            console.log("Carro localizado");
            res.status(200);
            res.send(row);
        });
    });
    server.get(`${urlBase}/valor_pago`, (req, res) => {

        const sql = `SELECT valor_pago FROM estacionamento 
                      ORDER BY id`;

        banco.DB.all(sql, [req.params.valor_pago], (err, rows) => {
            if (err) {
                res.send("Error ao mostrar o valor pago no estacionamento");
                res.status(500);
                throw err;
            }
            console.log("Valor localizado");
            res.status(200);
            res.send(rows);
        });
    });
    server.put(`${urlBase}/atualizar`, (req, res) => {

        const sql = `UPDATE produtos
                     SET placa_do_carro = ?, valor_pago = ?, hora_de_entrada = ?, hora_de_saida = ?
                     WHERE id = ?`;

        banco.DB.run(sql, [req.body.nome, req.body.valor, req.body.id], function (err) {
            if (err) {
                res.send("Error ao atualizar o estacionamento");
                res.status(500);
                console.error(err.message);
            }
            console.log(`Estacionamento atualizado: ${this.changes}`);
            res.status(202);
            res.send(`Estacionamento atualizado`);
        });
    });
    server.delete(`${urlBase}/remover/:id`, (req, res) => {

        const sql = `DELETE FROM estacionamento
                        WHERE id = ?`;

        banco.DB.run(sql, [req.params.id], function (err) {
            if (err) {
                res.send("Error ao remover o estacionamento do carro");
                res.status(500);
                console.error(err.message);
            }
            console.log(`Estacionamento do carro removido`);
            res.send(`Estacionamento do carro removido`);
        });
    });
}