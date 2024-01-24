const { initializeApp } = require("firebase/app");
const { getFirestore, collection, addDoc, doc, setDoc, getDocs } = require("firebase/firestore");

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

const addDataToFirestore = async (year, data) => {
  try {
    const docRef = doc(db, 'anos', year);
    const firstObject = data[0];

    // Garantindo que temos um objeto antes de chamar setDoc
    if (typeof firstObject === 'object' && firstObject !== null) {
      await setDoc(docRef, firstObject);
      console.log("Documento escrito com ID: ", docRef.id);
    } else {
      console.error("Erro: os dados não estão no formato esperado");
    }
  } catch (e) {
    console.error("Erro ao adicionar documento: ", e);
  }
};

const getAllDataFromFirestore = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'anos'));
    const allData = [];
    querySnapshot.forEach((doc) => {
      allData.push({ id: doc.id, ...doc.data() });
    });
    return allData;
  } catch (e) {
    console.error("Erro ao obter dados: ", e);
    return [];
  }
};

module.exports = { db, addDataToFirestore, firebaseConfig, getAllDataFromFirestore };
