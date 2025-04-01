const contenedorTarjetas = document.querySelector("#contenedor-libros");
const carritoCompras = document.querySelector("#carrito-compras")
const contenedorCarrito = document.querySelector("#contenedor-carrito");
const contadorCarrito = document.querySelector("#contador-carrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function crearTarjetasLibros(libros) {
    libros.forEach(libro => {
        const nuevoLibro = document.createElement("div");
        nuevoLibro.classList = "tarjeta-libro";
        nuevoLibro.innerHTML = `
            <img src="./img/libro.jpg">
            <p>Nombre: ${libro.nombre}</p>
            <p>Autor: ${libro.autor}</p>
            <p>Precio: $${libro.precio}</p>
        `;

        contenedorTarjetas.appendChild(nuevoLibro);

        if (parseInt(`${libro.stock}`) === 0) {
            let noStock = document.createElement("p");
            noStock.innerHTML = "No hay stock";
            nuevoLibro.appendChild(noStock);
        }
        else {
            let agregar = document.createElement("button");
            agregar.innerHTML = "Agregar al carrito";
            nuevoLibro.appendChild(agregar);

            agregar.addEventListener("click", () => {
                const libroRepeat = carrito.some((repeatLibro) => repeatLibro.nombre === libro.nombre)
                let cant;
                let acum;

                if (libroRepeat) {
                    carrito.map((lib) => {
                        if (lib.nombre === libro.nombre) {

                            lib.cantidad++;

                        }
                    })
                }
                else {
                    cant = 1;
                    acum = cant;
                    carrito.push({
                        nombre: libro.nombre,
                        autor: libro.autor,
                        precio: libro.precio,
                        cantidad: libro.cantidad,
                    })
                }
                console.log(carrito);
                carritoCounter();
                saveLocal();
            })
        }

    });
}

crearTarjetasLibros(libros);

const saveLocal = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

