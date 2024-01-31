// XLSXReader.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { XLSXReaderComponent } from 'xlsx-reader-component'; // Substitua pelo nome correto da sua biblioteca

import { inserirDadosDocentes } from './caminho/para/postgres'; // Substitua pelo caminho correto

const XLSXReader2 = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  const handleFileUpload = async (fileData) => {
    // Aqui você pode processar os dados conforme necessário antes de enviar ao backend
    console.log('Dados do arquivo:', fileData);
    setData(fileData);

    // Agora, você envia os dados para o backend para serem salvos no banco de dados
    try {
      const response = await fetch('http://seu-backend.com/api/inserirDocentes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dados: fileData }),
      });

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('Erro ao enviar dados para o backend:', error);
    }
  };

  const handleFinish = () => {
    // Executa alguma ação após a leitura do arquivo
    console.log('Leitura do arquivo concluída');
    navigate('/');
  };

  return (
    <div>
      <XLSXReaderComponent onDataUpload={handleFileUpload} onFinish={handleFinish} />
    </div>
  );
};

export default XLSXReader2;
