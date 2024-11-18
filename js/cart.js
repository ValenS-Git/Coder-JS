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
    closeButtonCart.className = "btn-close btn-close-white shadow-none border-0";

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
            <ion-icon name="trash-bin-outline" class="delete-product"></ion-icon>
        `;
        cartContent.append(cartGames);

        //restar el producto del carrito de forma individual
        let restar = cartGames.querySelector(".minus");
        restar.addEventListener("click", () => {
            if(juego.cantidad != 0){
                juego.cantidad --;
            }
            pintarCarrito();
            saveStorage();
        })

        //sumar el producto del carrito de forma individual
        let sumar = cartGames.querySelector(".plusle");
        sumar.addEventListener("click", () => {
            juego.cantidad ++;
            pintarCarrito();
            saveStorage();
        })
        //se crea el icono para eliminar el producto
        let eliminar = cartGames.querySelector(".delete-product");
        eliminar.addEventListener("click", () => {
            eliminarProducto(juego.id);
        });
    });

    const total = carrito.reduce((accumulador,el) => accumulador + el.precio * el.cantidad, 0);
    const totalBuy = document.createElement("div");
    totalBuy.className = "total-buy p-2 ";
    totalBuy.innerHTML = `
        <p>Total a pagar</p>
        <p>$ ${total.toFixed(2)}</p>
            `
        cartContent.append(totalBuy);

    const confirmPurchase = document.createElement("button");
    confirmPurchase.innerText = "Finalizar compra";
    confirmPurchase.className = "btn btn-primary";
        
    totalBuy.append(confirmPurchase);

    confirmPurchase.addEventListener("click", ()=>{

        Swal.fire({
            title: "Estas seguro de realizar la compra?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#54b91e",
            cancelButtonColor: "#e8231d",
            confirmButtonText: "Si, comprar",
            showClass: {
                popup: `
                    animate__animated
                    animate__fadeInUp
                    animate__faster
                `
            },
            hideClass: {
                popup: `
                    animate__animated
                    animate__fadeOutDown
                    animate__faster
                `
            }
        }).then((result) => {
            if (result.isConfirmed) {
                carrito = [];
                saveStorage();
                pintarCarrito();
                Swal.fire({
                    title: "Compra realizada",
                    text: "Muchas gracias por confiar!",
                    icon: "success"
                });
            }
        });
    });
};

//al hacer click, muestra el carrito
showCart.addEventListener("click", pintarCarrito);

//eliminar el producto, total
const eliminarProducto = (id) => {
    //encuentra el id del juego
    const foundId = carrito.find((element) => element.id === id);
    //retorna todos los ids, menos el que se elimina 
    carrito = carrito.filter((carritoId) => {
        return carritoId !== foundId;
    });
    saveStorage();
    pintarCarrito();
};