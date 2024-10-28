const pintarCarrito = ()=>{
    cartShop.innerHTML = "";
    cartShop.style.display = "block";
    const cartContent = document.createElement("div");
    cartContent.className = "contenedor-carrito col-12";
    cartContent.innerHTML = `
        <h2>Cart</h2>
    `;
    cartShop.append(cartContent);

    const closeButtonCart = document.createElement("button");
    closeButtonCart.className = "btn-close btn-close-white";

    closeButtonCart.addEventListener("click",()=>{
        cartShop.style.display = "none"; // estilo para que se cierre el carrito
    })
    cartContent.append(closeButtonCart);

    //cicla cada producto que se pushea, y lo agrega al carrito
    carrito.forEach((juego)=> {
        let cartGames = document.createElement("div");
        cartGames.className = "cart-games";
        cartGames.innerHTML = `
            <img src ="${juego.img}">
            <h3 class="title-game pt-3">${juego.nombre}</h3>
            <p class="precio">$ ${juego.precio}</p>
            <ion-icon name="remove-circle-outline" class="minus"></ion-icon>
            <p>Cant.: ${juego.cantidad}</p>
            <ion-icon name="add-circle-outline" class="plusle"></ion-icon>
        `;
        cartContent.append(cartGames);

        //restar el producto del carrito de forma individual
        let restar = cartGames.querySelector(".minus");
        restar.addEventListener("click", () => {
            if(juego.cantidad != 0){
                juego.cantidad --;
            }
            pintarCarrito();
            memoria();
        })

        //sumar el producto del carrito de forma individual
        let sumar = cartGames.querySelector(".plusle");
        sumar.addEventListener("click", () => {
            juego.cantidad ++;
            pintarCarrito();
            memoria();
        })
        //se crea el icono para eliminar el producto
        let eliminar = document.createElement("span")
        eliminar.innerHTML = `
        <ion-icon name="trash-bin-outline"></ion-icon>
        `;
        eliminar.className = "delete-product";
        cartGames.append(eliminar);

        //al hacer click, llama a la funcion eliminar producto.
        eliminar.addEventListener("click", eliminarProducto);
    });

    const total = carrito.reduce((accumulador,el) => accumulador + el.precio * el.cantidad, 0);
    const totalBuy = document.createElement("div");
    totalBuy.className = "total-buy px-2";
    totalBuy.innerHTML = `
        <p>Total a pagar</p>
        <p>$ ${total*100/100}</p>
    `
    cartContent.append(totalBuy);
};

//al hacer click, muestra el carrito
verCarrito.addEventListener("click", pintarCarrito);

//eliminar el producto, total
const eliminarProducto = () => {
    //encuentra el id del juego
    const foundId = carrito.find((element) => element.id);
    //retorna todos los ids, menos el que se elimina 
    carrito = carrito.filter((carritoId) => {
        return carritoId !== foundId;
    });
    memoria();
    pintarCarrito();
};