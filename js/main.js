const gameContent = document.getElementById("gamesContent");
const showCart = document.getElementById("carrito");
const cartShop = document.getElementById("cart-Shop");
const saveStorage = () =>{
    localStorage.setItem("Cart", JSON.stringify(carrito));
};
//se utiliza geiItem para recuperar lo que quedo almacenado en el localStorage.
let carrito = JSON.parse(localStorage.getItem("Cart")) || [];

const getGames = async() => {
    try{
        const response = await fetch ("json/games.json");
        const data = await response.json();
    
        data.forEach((juego)=> {
            //se crea el div contenedor con el nombre, titulo y precio de cada juego al realizar forEach
            let contenedor = document.createElement("div");
            contenedor.className = "col-6 col-sm-4 col-lg-3 my-3 contenedor-card"
            contenedor.innerHTML = `
                <img src ="${juego.img}">
                <h3 class="title-game pt-3">${juego.nombre}</h3>
                <p class="precio">$ ${juego.precio}</p>
            `;
            //se inserta el div dentro del div con el id="gameContent" que fue delcarado mas arriba
            gameContent.append(contenedor);
        
            //se crea una etiqueta boton, en donde el usuario al hacer click, va a agregar el objeto a su carrito
            let compra = document.createElement("button");
            compra.innerText = "Add to cart";
            compra.className = "btn btn-warning";
            contenedor.append(compra);
        
            compra.addEventListener("click", ()=>{
                //verifica si hay mas de un producto igual y me devuelve, false, si solo hay uno. Y true si hay 2 o mas.
                const repeat = carrito.some((repeatProduct) => repeatProduct.id === juego.id);
                
                //si hay un producto igual, suma la cantidad de producto +1 cosa de que no se repita. Si no hay ninguno, pushea el producto que se quiere agregar
                if(repeat === true){
                    carrito.map((prod) => {
                        if(prod.id === juego.id){
                            prod.cantidad++;
                        }
                    })
                } else {
                    carrito.push({
                        id: juego.id,
                        nombre: juego.nombre,
                        img: juego.img,
                        precio: juego.precio,
                        cantidad: juego.cantidad,
                    });
                    saveStorage();
                };
                Toastify({
                    text: `${juego.nombre} agregado`,
                    className: "info",
                    gravity: "bottom",
                    duration: 2500,
                    style: {
                    background: "linear-gradient(to right, #48c,#607cc9, #7b6fc0)",
                    }
                }).showToast();
            });
        });
    }
    catch(error){
        console.error('Hubo un problema al traer los datos');
    }
};
getGames();