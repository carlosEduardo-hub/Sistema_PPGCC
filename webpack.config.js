const path = require('path');



module.exports = {
  mode: 'development',
  entry: './src/XLSXReader.js', // Substitua pelo caminho do seu arquivo principal
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    fallback: {
      assert: require.resolve('assert/'),
      util: require.resolve('util/'),
      crypto: require.resolve('crypto-browserify'),
      path: require.resolve('path-browserify'),
      stream: require.resolve('stream-browserify'),
      buffer: require.resolve('buffer/'),
      fs: false,
      net: false,
      tls: false,
      dns: false,
    },
  },
    module: {
       rules: [
         // Adicione aqui suas regras para transpilar o código (por exemplo, Babel para JavaScript) 
         {
           test: /\.(js|jsx)$/,
           exclude: /node_modules/,
           use: {
             loader: 'babel-loader',
           },
         },
         // Regra para arquivos CSS
         {
           test: /\.css$/,
           use: ['style-loader', 'css-loader'],
         },
       ],
    },
   };
   