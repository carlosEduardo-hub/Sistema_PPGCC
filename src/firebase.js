const { initializeApp } = require("firebase/app");
const { getFirestore, collection, addDoc } = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyBRVKg3wEq1mhNTLdBU8VGVaSM0ZOIy0kE",
  authDomain: "ppgcc-db.firebaseapp.com",
  projectId: "ppgcc-db",
  storageBucket: "ppgcc-db.appspot.com",
  messagingSenderId: "503684435762",
  appId: "1:503684435762:web:d1d58359c1c61872ae112b",
  measurementId: "G-128Q8321RC"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to add data to the Firestore collection
const addData = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log("Documento escrito com ID: ", docRef.id);
  } catch (e) {
    console.error("Erro ao adicionar documento: ", e);
  }
};

// Example data
const exampleData = {
  "Ano Referência": "2022",
  "Discente - Mestrado - MATRICULADO": "10",
  // ... outras propriedades correspondentes às outras colunas
};

// Call the function with the example data
addData('suaColecao', exampleData); // Substitua 'suaColecao' pelo nome da sua coleção

const addExampleUser = async () => {
  const userData = {
    nome: 'Pedro',
    email: 'pedro@gmail.com',
  };

  // Chame a função addData para adicionar o usuário à coleção 'users'
  await addData('users', userData);
};

// Chame a função para adicionar o usuário de exemplo
addExampleUser();
