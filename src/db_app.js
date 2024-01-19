const { Client } = require('pg');

// Configurações do banco de dados
const dbConfig = {
  user: 'postgres',
  host: 'localhost',
  database: 'PPGCC_DB',
  password: '123',
  port: 5432
};

// Função para criar a tabela se não existir
async function createTable() {
  const client = new Client(dbConfig);

  try {
    await client.connect();

    // Verificar se a tabela já existe
    const result = await client.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public' AND table_name = 'tabela_programa';
    `);

    // Se não existir, crie a tabela
    if (!result.rows.length) {
      await client.query(`
        CREATE TABLE tabela_programa (
          "Ano Referência" INTEGER PRIMARY KEY,
          "Discente - Mestrado - MATRICULADO" INTEGER,
          "Discente - Mestrado - TITULADO" INTEGER,
          "Discente - Mestrado - DESLIGADO" INTEGER,
          "Discente - Mestrado - ABANDONOU" INTEGER,
          "Discente - Mestrado - MUDANCA DE NÍVEL SEM DEFESA" INTEGER,
          "Discente - Mestrado - MUDANCA DE NÍVEL COM DEFESA" INTEGER,
          "Discente - Mestrado - Total Ativos" INTEGER,
          "Discente - Mestrado - Total Inativos" INTEGER,
          "Discente - Mestrado - Total" INTEGER,
          "Discente - Mestrado - Tempo médio de titulação(Meses)" INTEGER,
          "Docente - Permanente" INTEGER,
          "Docente - Colaborador" INTEGER,
          "Docente - Visitante" INTEGER,
          "Docente - Total" INTEGER,
          "Participante Externo" INTEGER,
          "Pós-Doc" INTEGER,
          "Egresso - Mestrado" INTEGER,
          "Egresso - Total" INTEGER,
          "Disciplinas" INTEGER,
          "Financiadores" INTEGER,
          "Turmas" INTEGER,
          "Turmas Associadas a Projetos de Cooperação entre Instituições" INTEGER,
          "Áreas de Concentração" INTEGER,
          "Linhas de Pesquisa" INTEGER,
          "Projetos de Pesquisa Em Andamento" INTEGER,
          "Projetos de Pesquisa Concluídos" INTEGER,
          "Produção - ARTÍSTICO-CULTURAL Com participação de discentes" INTEGER,
          "Produção - ARTÍSTICO-CULTURAL Sem participação de discentes" INTEGER,
          "Produção - ARTÍSTICO-CULTURAL Com participação de egressos" INTEGER,
          "Total de Produções ARTÍSTICO-CULTURAL(S)" INTEGER,
          "Produção - BIBLIOGRÁFICA Com participação de discentes" INTEGER,
          "Produção - BIBLIOGRÁFICA Sem participação de discentes" INTEGER,
          "Produção - BIBLIOGRÁFICA Com participação de egressos" INTEGER,
          "Total de Produções BIBLIOGRÁFICA(S)" INTEGER,
          "Produção - TÉCNICA Com participação de discentes" INTEGER,
          "Produção - TÉCNICA Sem participação de discentes" INTEGER,
          "Produção - TÉCNICA Com participação de egressos" INTEGER,
          "Total de Produções TÉCNICA(S)" INTEGER,
          "Trabalhos de Conclusão de Nível Mestrado" INTEGER,
          "Total de Trabalhos de Conclusão" INTEGER
        );
      `);

      console.log('Tabela criada com sucesso.');
    } else {
      console.log('Tabela já existe.');
    }
  } catch (error) {
    console.error('Erro ao criar tabela:', error);
  } finally {
    await client.end();
  }
}

// Executar a função para criar a tabela
createTable();
module.exports = { Client, dbConfig };
