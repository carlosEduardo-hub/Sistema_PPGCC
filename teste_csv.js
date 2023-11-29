const readline = require("readline");
const fs = require("fs");

const line = readline.createInterface({
    input: fs.createReadStream("arquivo.csv"),
});

line.on("line", (data) => {
    let csv = data.split(";");

    console.log(`CPF: ${csv[0]} - Nome: ${csv[1]} - Email: ${csv[2]} - Endereco: ${csv[3]}`);
})