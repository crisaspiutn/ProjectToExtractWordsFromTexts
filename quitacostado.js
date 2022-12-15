let palabra3="'emergency'";
function limpiar_extremos_palabra(palabra){

    let lista_para_cambiar=[".",",","*","‘","’","•","-","—","–",":",";",":","©","б","‘","  ",'"',"'","&","%"];

    let primer_caracter=palabra[0];
    if(lista_para_cambiar.indexOf(primer_caracter)!=-1)palabra=palabra.replace(primer_caracter,"")
    let ultimo_caracter=palabra[palabra.length-1];
    if(lista_para_cambiar.indexOf(ultimo_caracter)!=-1)palabra=palabra.replace(ultimo_caracter,"")
    return palabra;
}
limpiar_extremos_palabra(palabra3)