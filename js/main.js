//Objeto de los productos
const juegos = [
    {
        id: 1,
        nombre: "Dragon ball: Sparking Zero",
        precio: 100,
        img: 'https://image.api.playstation.com/vulcan/ap/rnd/202405/2216/cbb03393f0ab1149f2b89a8194ce19e596a24fa5bec6526a.png',
        cantidad: 1,
    },
    {
        id: 2,
        nombre: "Black Myth: Wukong",
        precio: 39.99,
        img: 'https://image.api.playstation.com/vulcan/ap/rnd/202405/2117/bd406f42e9352fdb398efcf21a4ffe575b2306ac40089d21.png',
        cantidad: 1,
    },
    {
        id: 3,
        nombre: "Stellar Blade",
        precio: 59.99,
        img: 'https://image.api.playstation.com/vulcan/ap/rnd/202401/2211/40e7cfd126a11fe5118310ebce6d9b3a23e7cabaca717217.png',
        cantidad: 1,
    },
    {
        id: 4,
        nombre: "God of War Ragnarok",
        precio: 59.99,
        img: "https://image.api.playstation.com/vulcan/ap/rnd/202207/1210/4xJ8XB3bi888QTLZYdl7Oi0s.png",
        cantidad: 1,
    },
    {
        id: 5,
        nombre: "The last of us: part 2",
        precio: 19.99,
        img: "https://image.api.playstation.com/vulcan/ap/rnd/202312/0117/315718bce7eed62e3cf3fb02d61b81ff1782d6b6cf850fa4.png",
        cantidad: 1,
    },
    {
        id: 6,
        nombre: "Silent hills 2",
        precio: 49.99,
        img: "https://image.api.playstation.com/vulcan/ap/rnd/202210/2000/IgwsFz9BiBrFvyV7pIWpoVgd.png",
        cantidad: 1,
    },
    {
        id: 7,
        nombre: "F1 2024",
        precio: 69.99,
        img: "https://image.api.playstation.com/vulcan/ap/rnd/202404/0814/6337d7fda029c89f7d02de0825db21fdd8ab46d36cbcc82c.png",
        cantidad: 1,
    },
    {
        id: 8,
        nombre: "Demon Slayer",
        precio: 59.99,
        img: "https://image.api.playstation.com/vulcan/ap/rnd/202204/2223/cCXPnKm58hlda644LQnXDOIw.png",
        cantidad: 1,
    },
];


//se utiliza geiItem para recuperar lo que quedo almacenado en el localStorage.
let carrito = JSON.parse(localStorage.getItem("Cart")) || [];

const gameContent = document.getElementById("gamesContent");

juegos.forEach((juego)=> {
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
            memoria();
        };
    });
});

const verCarrito = document.getElementById("carrito");
const cartShop = document.getElementById("cart-Shop");


const memoria = () =>{
    localStorage.setItem("Cart", JSON.stringify(carrito));
};