//Programa que se basa en la compra de juegos y se muestra en consola los juegos obtenidos
function compraStockDeVidejuegos(){

    let videojuegos = [];
    do {
        let nombre = prompt("Introduzca el titulo del juego a comprar (o escriba 'salir' para finalizar)");
        if (nombre.toLowerCase() === "salir") {
            alert("Finalizo su compra de videojuegos");
            break;
        } else {
            videojuegos.push(nombre);
        }
    } while(true)
        alert(videojuegos);
}
compraStockDeVidejuegos();