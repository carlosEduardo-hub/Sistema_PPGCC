import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from 'recharts';

function App() {

  const data = [
    {name: 'Geeksforgeeks', students: 300},
    {name: 'Technical scripter', students: 750},
    {name: 'Geek-i-knack', students: 200},
    {name: 'Geek-o-mania', students: 500}
  ];

  return (
    <div className='grafico'>
      <h3 className='titulo'>Gráfico de Barra</h3>
      <BarChart width={600} height={600} data={data}>
      <Bar dataKey="students" fill="purple" />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="name" />
      <YAxis />
      </BarChart>
    </div>
    
  );
}

export default App;
