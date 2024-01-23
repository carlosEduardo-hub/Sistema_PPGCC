import React, { useState } from 'react';
import Select from 'react-select';
import * as XLSX from 'xlsx';
import ColumnChart from './chart-types/column';
import LineChart from './chart-types/line';
import AreaChart from './chart-types/area';
import BarChart from './chart-types/bar';
import './styles/graphicsTheme.css';
import { collection, addDoc } from "firebase/firestore";


const XLSXReader = () => {
  const [allData, setAllData] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]);
  const [selectedInfo, setSelectedInfo] = useState([]);
  const [dataMap, setDataMap] = useState({});
  const [allYears, setAllYears] = useState([]);
  const [chartName, setChartName] = useState('');


  const addDataToFirestore = async (data) => {
    try {
      const formattedDataForFirestore = data.map((item) => {
        return {
          "Ano Referência": item["nome"],
          "Discente - Mestrado - MATRICULADO": item["Discente - Mestrado - MATRICULADO"],
          "Discente - Mestrado - TITULADO": item["Discente - Mestrado - TITULADO"],
          "Discente - Mestrado - DESLIGADO": item["Discente - Mestrado - DESLIGADO"],
          "Discente - Mestrado - ABANDONOU": item["Discente - Mestrado - ABANDONOU"],
          "Discente - Mestrado - MUDANCA DE NÍVEL SEM DEFESA": item["Discente - Mestrado - MUDANCA DE NÍVEL SEM DEFESA"],
          "Discente - Mestrado - MUDANCA DE NÍVEL COM DEFESA": item["Discente - Mestrado - MUDANCA DE NÍVEL COM DEFESA"],
          "Discente - Mestrado - Total Ativos": item["Discente - Mestrado - Total Ativos"],
          "Discente - Mestrado - Total Inativos": item["Discente - Mestrado - Total Inativos"],
          "Discente - Mestrado - Total": item["Discente - Mestrado - Total"],
          "Discente - Mestrado - Tempo médio de titulação(Meses)": item["Discente - Mestrado - Tempo médio de titulação(Meses)"],
          "Docente - Permanente": item["Docente - Permanente"],
          "Docente - Colaborador": item["Docente - Colaborador"],
          "Docente - Visitante": item["Docente - Visitante"],
          "Docente - Total": item["Docente - Total"],
          "Participante Externo": item["Participante Externo"],
          "Pós-Doc": item["Pós-Doc"],
          "Egresso - Mestrado": item["Egresso - Mestrado"],
          "Egresso - Total": item["Egresso - Total"],
          "Disciplinas": item["Disciplinas"],
          "Financiadores": item["Financiadores"],
          "Turmas": item["Turmas"],
          "Turmas Associadas a Projetos de Cooperação entre Instituições": item["Turmas Associadas a Projetos de Cooperação entre Instituições"],
          "Áreas de Concentração": item["Áreas de Concentração"],
          "Linhas de Pesquisa": item["Linhas de Pesquisa"],
          "Projetos de Pesquisa Em Andamento": item["Projetos de Pesquisa Em Andamento"],
          "Projetos de Pesquisa Concluídos": item["Projetos de Pesquisa Concluídos"],
          "Produção - ARTÍSTICO-CULTURAL Com participação de discentes": item["Produção - ARTÍSTICO-CULTURAL Com participação de discentes"],
          "Produção - ARTÍSTICO-CULTURAL Sem participação de discentes": item["Produção - ARTÍSTICO-CULTURAL Sem participação de discentes"],
          "Produção - ARTÍSTICO-CULTURAL Com participação de egressos": item["Produção - ARTÍSTICO-CULTURAL Com participação de egressos"],
          "Total de Produções ARTÍSTICO-CULTURAL(S)": item["Total de Produções ARTÍSTICO-CULTURAL(S)"],
          "Produção - BIBLIOGRÁFICA Com participação de discentes": item["Produção - BIBLIOGRÁFICA Com participação de discentes"],
          "Produção - BIBLIOGRÁFICA Sem participação de discentes": item["Produção - BIBLIOGRÁFICA Sem participação de discentes"],
          "Produção - BIBLIOGRÁFICA Com participação de egressos": item["Produção - BIBLIOGRÁFICA Com participação de egressos"],
          "Total de Produções BIBLIOGRÁFICA(S)": item["Total de Produções BIBLIOGRÁFICA(S)"],
          "Produção - TÉCNICA Com participação de discentes": item["Produção - TÉCNICA Com participação de discentes"],
          "Produção - TÉCNICA Sem participação de discentes": item["Produção - TÉCNICA Sem participação de discentes"],
          "Produção - TÉCNICA Com participação de egressos": item["Produção - TÉCNICA Com participação de egressos"],
          "Total de Produções TÉCNICA(S)": item["Total de Produções TÉCNICA(S)"],
          "Trabalhos de Conclusão de Nível Mestrado": item["Trabalhos de Conclusão de Nível Mestrado"],
          "Total de Trabalhos de Conclusão": item["Total de Trabalhos de Conclusão"],
        };
      });
  
      const docRef = await addDoc(collection(app, "suaColecao"), formattedDataForFirestore);
      console.log("Documento escrito com ID: ", docRef.id);
    } catch (e) {
      console.error("Erro ao adicionar documento: ", e);
    }
  }
   
 

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

       addDataToFirestore(formattedData);
   
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
