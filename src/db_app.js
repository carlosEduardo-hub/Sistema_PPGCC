const pg = require('pg');

const cliente = new pg.Client({
   user: 'postgres',
   host: 'localhost',
   database: 'test',
   password: '123',
   port: 5432
});

async function dropTables(){
   await cliente.query('DROP TABLE IF EXISTS evento CASCADE');
   await cliente.query('DROP TABLE IF EXISTS participante CASCADE');
   await cliente.query('DROP TABLE IF EXISTS evento_participante CASCADE');
   console.log("Tabelas Removidas");
}

async function createTables(){
   await cliente.query('CREATE TABLE evento( id serial PRIMARY KEY, nome VARCHAR (50) UNIQUE NOT NULL )');
   await cliente.query('CREATE TABLE participante( id serial PRIMARY KEY, nome VARCHAR (50) UNIQUE NOT NULL )');
   await cliente.query('CREATE TABLE evento_participante( evento_id integer NOT NULL, participante_id integer NOT NULL, PRIMARY KEY (evento_id, participante_id), FOREIGN KEY (evento_id) REFERENCES evento (id), FOREIGN KEY (participante_id) REFERENCES participante (id) )');
   console.log("Tabelas Criadas");
}

async function insertData(){
   const queryEvento = "INSERT INTO evento (nome) VALUES ($1)";
   await cliente.query(queryEvento, ['Encontro de Nodejs']);
   await cliente.query(queryEvento, ['Encontro de Postgresql']);
   
   const queryParticipante = "INSERT INTO participante (nome) VALUES ($1)";
   await cliente.query(queryParticipante, ['Carlos']);
   await cliente.query(queryParticipante, ['Augusto']);
   await cliente.query(queryParticipante, ['Janaina']);
   await cliente.query(queryParticipante, ['Rafael']);
   
   const queryEventoParticipante = "INSERT INTO evento_participante (evento_id, participante_id) VALUES ($1, $2)";
   await cliente.query(queryEventoParticipante, [1, 1]);
   await cliente.query(queryEventoParticipante, [1, 2]);
   await cliente.query(queryEventoParticipante, [1, 3]);
   await cliente.query(queryEventoParticipante, [2, 3]);
   await cliente.query(queryEventoParticipante, [2, 4]);
   console.log("Dados Inseridos");
}

async function ListData(){
   const resultEvento = await cliente.query("SELECT * FROM evento");
   console.log("EVENTOS:", resultEvento.rows);
   
   const resultParticipante = await cliente.query("SELECT * FROM participante");
   console.log("PARTICIPANTES:", resultParticipante.rows);
   
   const resultEventoParticipante = await cliente.query("SELECT e.nome AS evento, p.nome AS participante FROM evento AS e, participante AS p, evento_participante ep WHERE ep.evento_id = e.id AND ep.participante_id = p.id");
   console.log("EVENTOS COM PARTICIPANTES:", resultEventoParticipante.rows);
}

async function main(){
   try {
       await cliente.connect();
       await dropTables();
       await createTables();
       await insertData();
       await ListData();
   } catch (err) {
       console.error(err);
   } finally {
       await cliente.end();
   }
}

main();
