const sqllite3 = require('sqlite3').verbose();

const db = new sqllite3.Database('./banco.db', (error) => {
    if (error) {
        console.log('Error ao criar o banco de dados', error);
    } else {
        console.log('Banco criado com sucesso....');
        
    }
});

const createTable = () => {
    console.log("Criando table estacionamento");
    db.run("CREATE TABLE IF NOT EXISTS estacionamento(id INTEGER PRIMARY KEY AUTOINCREMENT, placa_do_carro INTEGER, valor_pago NUMBER, hora_de_entrada TEXT, hora_de_saida TEXT)", (err)=>{
        if(err){
            console.log("Error ao criar tabela",err);
        }else{
            console.log("Tabela criada com sucesso.");
        }
    });
}

const close = () => {
    db.close();
}

module.exports = {
    DB: db,
    createTable,
    close
}