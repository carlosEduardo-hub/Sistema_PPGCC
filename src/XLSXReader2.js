import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { Client, dbConfig } from './db_app.js';

const XLSXReader = () => {
 const [files, setFiles] = useState([]);

 // Função para inserir dados na tabela
 async function insertDataIntoTable(data) {
    const client = new Client(dbConfig);
   
    try {
       await client.connect();
   
       for (const row of data) {
         const keys = Object.keys(row);
         const values = keys.map((key) => row[key]);
   
         const result = await client.query(`
         INSERT INTO tabela_programa (
            "Ano Referência", "Discente - Mestrado - MATRICULADO", "Discente - Mestrado - TITULADO",
            "Discente - Mestrado - DESLIGADO", "Discente - Mestrado - ABANDONOU", "Discente - Mestrado - MUDANCA DE NÍVEL SEM DEFESA",
            "Discente - Mestrado - MUDANCA DE NÍVEL COM DEFESA", "Discente - Mestrado - Total Ativos", "Discente - Mestrado - Total Inativos",
            "Discente - Mestrado - Total", "Discente - Mestrado - Tempo médio de titulação(Meses)", "Docente - Permanente", "Docente - Colaborador",
            "Docente - Visitante", "Docente - Total", "Participante Externo", "Pós-Doc", "Egresso - Mestrado", "Egresso - Total", "Disciplinas",
            "Financiadores", "Turmas", "Turmas Associadas a Projetos de Cooperação entre Instituições", "Áreas de Concentração", "Linhas de Pesquisa",
            "Projetos de Pesquisa Em Andamento", "Projetos de Pesquisa Concluídos", "Produção - ARTÍSTICO-CULTURAL Com participação de discentes",
            "Produção - ARTÍSTICO-CULTURAL Sem participação de discentes", "Produção - ARTÍSTICO-CULTURAL Com participação de egressos",
            "Total de Produções ARTÍSTICO-CULTURAL(S)", "Produção - BIBLIOGRÁFICA Com participação de discentes",
            "Produção - BIBLIOGRÁFICA Sem participação de discentes", "Produção - BIBLIOGRÁFICA Com participação de egressos",
            "Total de Produções BIBLIOGRÁFICA(S)", "Produção - TÉCNICA Com participação de discentes", "Produção - TÉCNICA Sem participação de discentes",
            "Produção - TÉCNICA Com participação de egressos", "Total de Produções TÉCNICA(S)", "Trabalhos de Conclusão de Nível Mestrado",
            "Total de Trabalhos de Conclusão"
           ) 
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, $41, $42, $43, $44, $45, $46, $47, $48, $49, $50)
           ON CONFLICT ("Ano Referência") DO NOTHING;           
         `, values);
   
         console.log(`Linhas afetadas: ${result.rowCount}`);
       }
   
       console.log('Dados inseridos com sucesso.');
    } catch (error) {
       console.error('Erro ao inserir dados na tabela:', error);
    } finally {
       await client.end();
    }
   }

 const handleFileChange = (event) => {
    setFiles(event.target.files);
 };

 const handleUploadClick = async () => {
    if (files.length) {
      for (const file of files) {
        const reader = new FileReader();
        reader.onload = async (event) => {
          const data = new Uint8Array(event.target.result);
          const workbook = XLSX.read(data, { type: "array" });
          let parsedData = XLSX.utils.sheet_to_json(
            workbook.Sheets[workbook.SheetNames[0]],
            { header: 1 }
          );
          parsedData = parsedData.map((row) => row.slice(2));
          insertDataIntoTable(parsedData);
        };
        reader.readAsArrayBuffer(file);
      }
    }
 };

 return (
    <div className="min-h-screen bg-bgcolor flex justify-center items-center flex-col gap-3">
      <div className='flex flex-col justify-center items-center gap-3'>
        <div className="mt-8">
          <h1 className="text-hovercolor mb-4">Selecione arquivo(s)</h1>
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileChange}
            multiple
            className="block w-full text-sm text-slate-400
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-violet-50 file:text-violet-700
          hover:file:bg-violet-200"
          />
          <button onClick={handleUploadClick}>Upload</button>
        </div>
        {/* ... resto do código ... */}
      </div>
    </div>
 );
};

export default XLSXReader;
