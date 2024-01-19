import React, { useState } from 'react';
import Select from 'react-select';
import * as XLSX from 'xlsx';
import ColumnChart from './chart-types/column';
import LineChart from './chart-types/line';
import AreaChart from './chart-types/area';
import BarChart from './chart-types/bar';
import './styles/graphicsTheme.css';
import { Client, dbConfig } from './db_app.js';





const XLSXReader = () => {
  const [allData, setAllData] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]);
  const [selectedInfo, setSelectedInfo] = useState([]);
  const [dataMap, setDataMap] = useState({});
  const [allYears, setAllYears] = useState([]);
  const [chartName, setChartName] = useState("");



  const handleFileChosen = (files) => {
    const readers = Array.from(files).forEach((file) => {
     const reader = new FileReader();
   
     reader.onload = async (event) => {
       const data = new Uint8Array(event.target.result);
       const workbook = XLSX.read(data, { type: "array" });
   
       let parsedData = XLSX.utils.sheet_to_json(
         workbook.Sheets[workbook.SheetNames[0]],
         { header: 1 }
       );
       parsedData = parsedData.map((row) => row.slice(2));
   
       const years = parsedData[0]
         .slice(1)
         .filter(
           (item) => item !== "Instituição de Ensino" && item !== "nome"
         );
   
       const formattedData = parsedData.slice(1).map((item) => {
         return {
           nome: item[0],
           ...Object.fromEntries(
             years.map((header, index) => [
               header,
               parseInt(item[index + 1], 10),
             ])
           ),
         };
       });
   
       const client = new Client(dbConfig);
       try {
         await client.connect();

         const query = `
          INSERT INTO tabela_programa (
            "Ano Referência", "Discente - Mestrado - MATRICULADO", "Discente - Mestrado - TITULADO",
            "Discente - Mestrado - DESLIGADO", "Discente - Mestrado - ABANDONOU", 
            "Discente - Mestrado - MUDANCA DE NÍVEL SEM DEFESA", "Discente - Mestrado - MUDANCA DE NÍVEL COM DEFESA",
            "Discente - Mestrado - Total Ativos", "Discente - Mestrado - Total Inativos", 
            "Discente - Mestrado - Total", "Discente - Mestrado - Tempo médio de titulação(Meses)",
            "Docente - Permanente", "Docente - Colaborador", "Docente - Visitante", 
            "Docente - Total", "Participante Externo", "Pós-Doc", "Egresso - Mestrado", 
            "Egresso - Total", "Disciplinas", "Financiadores", "Turmas", 
            "Turmas Associadas a Projetos de Cooperação entre Instituições", "Áreas de Concentração", 
            "Linhas de Pesquisa", "Projetos de Pesquisa Em Andamento", "Projetos de Pesquisa Concluídos", 
            "Produção - ARTÍSTICO-CULTURAL Com participação de discentes", 
            "Produção - ARTÍSTICO-CULTURAL Sem participação de discentes", 
            "Produção - ARTÍSTICO-CULTURAL Com participação de egressos", 
            "Total de Produções ARTÍSTICO-CULTURAL(S)", "Produção - BIBLIOGRÁFICA Com participação de discentes", 
            "Produção - BIBLIOGRÁFICA Sem participação de discentes", 
            "Produção - BIBLIOGRÁFICA Com participação de egressos", 
            "Total de Produções BIBLIOGRÁFICA(S)", "Produção - TÉCNICA Com participação de discentes", 
            "Produção - TÉCNICA Sem participação de discentes", 
            "Produção - TÉCNICA Com participação de egressos", "Total de Produções TÉCNICA(S)", 
            "Trabalhos de Conclusão de Nível Mestrado", "Total de Trabalhos de Conclusão"
          ) 
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, $41, $42, $43, $44, $45, $46, $47, $48, $49, $50, $51, $52, $53, $54, $55, $56, $57, $58, $59, $60, $61, $62, $63, $64, $65, $66, $67, $68, $69, $70, $71, $72, $73, $74, $75, $76, $77, $78, $79, $80, $81, $82, $83, $84, $85, $86, $87, $88, $89, $90, $91, $92, $93, $94, $95, $96, $97, $98, $99, $100, $101, $102, $103, $104, $105, $106, $107, $108, $109, $110, $111, $112, $113, $114, $115, $116, $117, $118, $119, $120, $121, $122, $123, $124, $125, $126, $127, $128, $129, $130, $131, $132, $133, $134, $135, $136, $137, $138, $139, $140, $141, $142, $143, $144, $145, $146, $147, $148, $149, $150, $151, $152, $153, $154, $155, $156, $157, $158, $159, $160, $161, $162, $163, $164, $165, $166, $167, $168, $169, $170, $171, $172, $173, $174,```

         // Insira cada item de dados na tabela
         for (const item of formattedData) {
           // Crie um novo objeto com as chaves na ordem correta
           const orderedItem = {
              "Ano Referência": item["Ano Referência"] || 0,
              "Discente - Mestrado - MATRICULADO": item["Discente - Mestrado - MATRICULADO"] || 0,
              "Discente - Mestrado - TITULADO": item["Discente - Mestrado - TITULADO"] || 0,
              "Discente - Mestrado - DESLIGADO": item["Discente - Mestrado - DESLIGADO"] || 0,
              "Discente - Mestrado - ABANDONOU": item["Discente - Mestrado - ABANDONOU"] || 0,
              "Discente - Mestrado - MUDANCA DE NÍVEL SEM DEFESA": item["Discente - Mestrado - MUDANCA DE NÍVEL SEM DEFESA"] || 0,
              "Discente - Mestrado - MUDANCA DE NÍVEL COM DEFESA": item["Discente - Mestrado - MUDANCA DE NÍVEL COM DEFESA"] || 0,
              "Discente - Mestrado - Total Ativos": item["Discente - Mestrado - Total Ativos"] || 0,
              "Discente - Mestrado - Total Inativos": item["Discente - Mestrado - Total Inativos"] || 0,
              "Discente - Mestrado - Total": item["Discente - Mestrado - Total"] || 0,
              "Discente - Mestrado - Tempo médio de titulação(Meses)": item["Discente - Mestrado - Tempo médio de titulação(Meses)"] || 0,
              "Docente - Permanente": item["Docente - Permanente"] || 0,
              "Docente - Colaborador": item["Docente - Colaborador"] || 0,
              "Docente - Visitante": item["Docente - Visitante"] || 0,
              "Docente - Total": item["Docente - Total"] || 0,
              "Participante Externo": item["Participante Externo"] || 0,
              "Pós-Doc": item["Pós-Doc"] || 0,
              "Egresso - Mestrado": item["Egresso - Mestrado"] || 0,
              "Egresso - Total": item["Egresso - Total"] || 0,
              "Disciplinas": item["Disciplinas"] || 0,
              "Financiadores": item["Financiadores"] || 0,
              "Turmas": item["Turmas"] || 0,
              "Turmas Associadas a Projetos de Cooperação entre Instituições": item["Turmas Associadas a Projetos de Cooperação entre Instituições"] || 0,
              "Áreas de Concentração": item["Áreas de Concentração"] || 0,
              "Linhas de Pesquisa": item["Linhas de Pesquisa"] || 0,
              "Projetos de Pesquisa Em Andamento": item["Projetos de Pesquisa Em Andamento"] || 0,
              "Projetos de Pesquisa Concluídos": item["Projetos de Pesquisa Concluídos"] || 0,
              "Produção - ARTÍSTICO-CULTURAL Com participação de discentes": item["Produção - ARTÍSTICO-CULTURAL Com participação de discentes"] || 0,
              "Produção - ARTÍSTICO-CULTURAL Sem participação de discentes": item["Produção - ARTÍSTICO-CULTURAL Sem participação de discentes"] || 0,
              "Produção - ARTÍSTICO-CULTURAL Com participação de egressos": item["Produção - ARTÍSTICO-CULTURAL Com participação de egressos"] || 0,
              "Total de Produções ARTÍSTICO-CULTURAL(S)": item["Total de Produções ARTÍSTICO-CULTURAL(S)"] || 0,
              "Produção - BIBLIOGRÁFICA Com participação de discentes": item["Produção - BIBLIOGRÁFICA Com participação de discentes"] || 0,
              "Produção - BIBLIOGRÁFICA Sem participação de discentes": item["Produção - BIBLIOGRÁFICA Sem participação de discentes"] || 0,
              "Produção - BIBLIOGRÁFICA Com participação de egressos": item["Produção - BIBLIOGRÁFICA Com participação de egressos"] || 0,
              "Total de Produções BIBLIOGRÁFICA(S)": item["Total de Produções BIBLIOGRÁFICA(S)"] || 0,
              "Produção - TÉCNICA Com participação de discentes": item["Produção - TÉCNICA Com participação de discentes"] || 0,
              "Produção - TÉCNICA Sem participação de discentes": item["Produção - TÉCNICA Sem participação de discentes"] || 0,
              "Produção - TÉCNICA Com participação de egressos": item["Produção - TÉCNICA Com participação de egressos"] || 0,
              "Total de Produções TÉCNICA(S)": item["Total de Produções TÉCNICA(S)"] || 0,
              "Trabalhos de Conclusão de Nível Mestrado": item["Trabalhos de Conclusão de Nível Mestrado"] || 0,
              "Total de Trabalhos de Conclusão": item["Total de Trabalhos de Conclusão"] || 0,
            };            
           const values = Object.values(orderedItem);
           await client.query(query, values);
         }
   
         console.log('Dados inseridos com sucesso.');
       } catch (error) {
         console.error('Erro ao inserir dados:', error);
       } finally {
         await client.end();
       }
   
       setAllData((prevData) => [...prevData, ...formattedData]);
       const dataAssocMap = formattedData.reduce((acc, curr) => {
         acc[curr.nome] = curr;
         return acc;
       }, dataMap);
   
       setDataMap(dataAssocMap);
   
       const newYears = Object.values(dataAssocMap).reduce((acc, curr) => {
         return [...acc, ...Object.keys(curr)];
       }, []);
       setAllYears(Array.from(new Set(newYears)));
     };
   
     reader.readAsArrayBuffer(file);
    });
   };
   

  const handleInfoChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    console.log("Select Ano:", selectedValues);
    if (selectedValues.includes('select_all')) {
      setSelectedYears(Object.keys(dataMap));
    } else {
      setSelectedYears(selectedValues);
    }
  };


  const handleYearChange = (selectedOptions) => {
    const selectedYearValues = selectedOptions.map((option) => option.value);
    console.log("Select Info:", selectedYearValues);
    setSelectedInfo(selectedYearValues || []);
  };

  const getSelectedYearsData = (info, year) => {
    const foundData = dataMap[info];
    return foundData && foundData[year] !== undefined ? foundData[year] : 0;
  };

  

  return (
    <div className="min-h-screen bg-bgcolor flex justify-center items-center flex-col gap-3">
      <div className='flex flex-col justify-center items-center gap-3'>
        <div className="mt-8">
          <h1 className="text-hovercolor mb-4">Selecione arquivo(s)</h1>
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={(e) => handleFileChosen(e.target.files)}
            multiple
            className="block w-full text-sm text-slate-400
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-violet-50 file:text-violet-700
          hover:file:bg-violet-200"
          />
        </div>
        <div>
          {allData.length > 0 && (
            <input
              type="text"
              value={chartName}
              onChange={(e) => setChartName(e.target.value)}
              placeholder="Nome do gráfico..."
              className='block w-full text-sm rounded-lg h-7 text-slate-500 bg-secondbgcolor border-solid border-2 border-sky-500'
            />
          )}
        </div>
      </div>

      {Object.keys(dataMap).length > 0 && (
        <div className="flex flex-col items-center w-full overflow-auto mt-4">
          <div className="flex justify-center align-center w-full">
            <div className="selector-year" style={{ width: '300px' }}>
              <Select
                placeholder="Ano..."
                options={[
                  { value: 'select_all', label: 'Selecionar todos' },
                  ...Object.keys(dataMap).map((item) => ({
                    value: item,
                    label: item,
                  }))
                ]}
                isMulti
                value={selectedYears.map((item) => ({
                  value: item,
                  label: item,
                }))}
                onChange={handleInfoChange}
                className="bg-secondbgcolor rounded-l-lg border-solid border-2 border-sky-500"
                closeMenuOnSelect={false}
                isSearchable
                hideSelectedOptions={false}
                menuPortalTarget={document.body}
                menuPosition={'absolute'}
              />

            </div>
            <div className="selector-info" style={{ width: '300px' }}>
              <Select
                placeholder="Informações..."
                options={allYears
                  .filter((year) => year !== "nome")
                  .map((year) => ({
                    value: year,
                    label: year.toString(),
                  }))}
                isMulti
                value={selectedInfo.map((year) => ({
                  value: year,
                  label: year.toString(),
                }))}
                onChange={handleYearChange}
                className="bg-secondbgcolor rounded-r-lg border-solid border-2 border-sky-500"
                closeMenuOnSelect={false}
                isSearchable
                hideSelectedOptions={false}
                menuPortalTarget={document.body}
                menuPosition={'absolute'}
              />
            </div>


          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="border-solid border-4 border-graphicsbordercolor rounded-lg">
              <LineChart
                getSelectedYearsData={getSelectedYearsData}
                selectedInfo={selectedInfo}
                selectedYears={selectedYears}
                chartName={chartName}
              />
            </div>
            <div className="border-solid border-4 border-graphicsbordercolor rounded-lg">
              <AreaChart
                getSelectedYearsData={getSelectedYearsData}
                selectedInfo={selectedInfo}
                selectedYears={selectedYears}
                chartName={chartName}
              />
            </div>
            <div className="border-solid border-4 border-graphicsbordercolor rounded-lg">
              <BarChart
                getSelectedYearsData={getSelectedYearsData}
                selectedInfo={selectedInfo}
                selectedYears={selectedYears}
                chartName={chartName}
              />
            </div>
            <div className="border-solid border-4 border-graphicsbordercolor rounded-lg">
              <ColumnChart
                getSelectedYearsData={getSelectedYearsData}
                selectedInfo={selectedInfo}
                selectedYears={selectedYears}
                chartName={chartName}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default XLSXReader;
