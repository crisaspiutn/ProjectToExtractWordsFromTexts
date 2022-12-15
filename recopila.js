const fs=require("fs");
// const { si_existe } = require("../../proye/proyecto-practicas/librerias-internas-node/eje_fs");
console.log("hola");

function leer_base(){return JSON.parse(fs.readFileSync("base_de_datos.txt",'utf-8'))}// da lista
function leer_texto(){return fs.readFileSync("fuente_de_datos.txt",'utf-8')}// da texto

let lista=leer_base();
let texto=leer_texto();
// console.log(texto);
// nueva_lista=obtiene_sin_repetidos(texto);
texto=cambiar_todo_de(texto,'\n'," ");
texto=cambiar_todo_de(texto,'\r'," ");
texto=cambiar_todo_de(texto,'"'," ");
let nueva_lista=acumula_sin_repetidos(lista,texto);
for (let x = 0; x < nueva_lista.length; x++) {
    nueva_lista[x]=purifica_texto(nueva_lista[x]);
}
nueva_lista=descarta_vacios(nueva_lista);
nueva_lista=detecta_lista_dentro_de_lista_y_agrega_a_general(nueva_lista);
nueva_lista=descarta_repetidos(nueva_lista);
// let lista_para_borrar=[".",",","*","‘","’","•","-","—","–",":",";",":","©","б","‘","?","  ","\n","\n","\r","\t","[","]","(",")","{","}","1","2","3","4","5","6","7","8","9","0"];
// for (let i = 0; i < lista_para_borrar.length; i++) {
//     nueva_lista=descarta_elementos(nueva_lista,lista_para_borrar[i]);
// }

console.log(nueva_lista.length);
guardar(nueva_lista);
// guardar(acumula_sin_repetidos(lista,texto));







function guardar(lista){
    fs.writeFileSync("base_de_datos.txt",JSON.stringify(lista.sort()),'utf-8');
    console.log("guardado en base");
}
function obtiene_sin_repetidos(texto){// retorna lista
    let diccionario={}
    let lista=texto.split(" ");
    for (let i = 0; i < lista.length; i++) {
        diccionario[lista[i].trim()]=lista[i];
    }
    return Object.keys(diccionario)
}
function acumula_sin_repetidos(let_base_de_datos,texto){// retorna lista
    let diccionario={}
    for (let i = 0; i < let_base_de_datos.length; i++) {
        diccionario[let_base_de_datos[i]]=let_base_de_datos[i];        
    }
    let lista=texto.split(" ");
    for (let i = 0; i < lista.length; i++) {
        if(lista[i]!="")
        diccionario[lista[i].trim()]=lista[i];
    }
    return Object.keys(diccionario)
}
function purifica_texto(texto){
    // console.log(texto);
    texto=texto.toLowerCase();
    let lista_para_cambiar=[".",",","*","‘","’","•","-","—","–",":",";",":","©","б","‘","  "];
    let lista_para_borrar=["\n","\n","\r","\t","[","]","(",")","{","}","?","1","2","3","4","5","6","7","8","9","0"];
    for (let i = 0; i < lista_para_cambiar.length; i++) {
        texto=cambiar_todo_de(texto,lista_para_cambiar[i]," ");
    }
    for (let i = 0; i < lista_para_borrar.length; i++) {
        texto=cambiar_todo_de(texto,lista_para_borrar[i],"");
    }
    return texto.trim();
}
function cambiar_todo_de(texto,caracter,new_caracter){
    while(texto.indexOf(caracter)!=-1){
        texto=texto.replace(caracter,new_caracter);
    }
    return texto;
}
function descarta_elementos(lista_para_cambiar,caracter){
    let lista_vieja=[];
    let lista_nueva=[];

    for (let i = 0; i < lista_para_cambiar.length; i++) {
        if(lista_para_cambiar[i].indexOf(caracter)!=-1)
        lista_vieja.push(lista_para_cambiar[i])
        else
        lista_nueva.push(lista_para_cambiar[i])

    }
    console.log(lista_vieja);
    return lista_nueva;
}
function descarta_vacios(lista){
    let nueva_lista = [];
    for (let a = 0; a < lista.length; a++) {
        if(lista[a]!="")nueva_lista.push(lista[a]);
    }
    return nueva_lista;
}
function descarta_repetidos(lista){//recibe lista
    let nueva_lista = {};
    for (let a = 0; a < lista.length; a++) {
        if(lista[a]!="")nueva_lista[lista[a]]="";
    }
    return Object.keys(nueva_lista);
}
function detecta_lista_dentro_de_lista_y_agrega_a_general(lista_general){
    let nueva_lista_general=[]
    for (let i = 0; i < lista_general.length; i++) {
        let mini_lista = lista_general[i].split(" ");
        if(typeof mini_lista=="object")
        for (let j = 0; j < mini_lista.length; j++) {
            mini_lista[j]=limpiar_extremos_palabra(mini_lista[j]);
            nueva_lista_general.push(mini_lista[j]);
        }
        else{
            mini_lista=limpiar_extremos_palabra(mini_lista);
            nueva_lista_general.push(mini_lista);
        }
    }
    return nueva_lista_general;
}
function limpiar_extremos_palabra(palabra){

    let lista_para_cambiar=[".",",","*","‘","’","•","-","—","–",":",";",":","©","б","‘","  ",'"',"'","&","%"];

    let primer_caracter=palabra[0];
    if(lista_para_cambiar.indexOf(primer_caracter)!=-1)palabra=palabra.replace(primer_caracter,"")
    let ultimo_caracter=palabra[palabra.length-1];
    if(lista_para_cambiar.indexOf(ultimo_caracter)!=-1)palabra=palabra.replace(ultimo_caracter,"")
    return palabra;
}