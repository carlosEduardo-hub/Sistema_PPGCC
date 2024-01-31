// postgres.js

const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('seu_banco_de_dados.db');

function inserirDadosDocentes(dados) {
  dados.forEach((linha) => {
    const [identificadorPessoa, nomeDocente] = linha;
    const sql = 'INSERT INTO docente (id_Pessoa, nome) VALUES (?, ?)';

    db.run(sql, [identificadorPessoa, nomeDocente], function (err) {
      if (err) {
        console.error('Erro ao inserir dados:', err.message);
      } else {
        console.log(`Row inserted ${this.lastID}`);
      }
    });
  });
}

module.exports = { inserirDadosDocentes };
