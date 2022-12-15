const fs=require("fs");
const lista=JSON.parse(fs.readFileSync("./base_de_datos.txt","utf-8"));
console.log(lista.length)
// console.log(lista)