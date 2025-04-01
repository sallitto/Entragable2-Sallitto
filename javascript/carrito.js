const pintarCarrito = () => {
    contenedorCarrito.innerHTML = "";
    contenedorCarrito.style.display = "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `
        <h2 class="modal-header-title">Carrito de compras</h2>
    `;
    contenedorCarrito.appendChild(modalHeader);

    const modalbutton = document.createElement("h1");
    modalbutton.innerHTML = "X";
    modalbutton.className = "modal-header-button";

    modalbutton.addEventListener("click", () => {
        contenedorCarrito.style.display = "none";
    })

    modalHeader.appendChild(modalbutton);

    carrito.forEach((libro) => {
        let carritoContent = document.createElement("div");
        carritoContent.className = "modal-content";
        carritoContent.innerHTML = `
                <p>${libro.nombre}</p>
                <p>$${libro.precio}</p>
                <span class = "restar"> ➖ </span>
                <p>cantidad ${libro.cantidad}</p>
                <span class = "sumar"> ➕ </span>
                <p>total ${libro.cantidad * libro.precio}</p>
        `;
        contenedorCarrito.appendChild(carritoContent);

        let restar = carritoContent.querySelector(".restar");

        restar.addEventListener("click", () => {

            if (libro.cantidad !== 1) {
                libro.cantidad--;
            }
            saveLocal();
            pintarCarrito();

        })

        let sumar = carritoContent.querySelector(".sumar");

        sumar.addEventListener("click", () => {
                
            libro.cantidad++;
            saveLocal();
            pintarCarrito();
        })


        let elimnarlibro = document.createElement("span");
        elimnarlibro.innerText = "❌";
        elimnarlibro.className = "libro-delete";

        carritoContent.appendChild(elimnarlibro);

        elimnarlibro.addEventListener("click", eliminarLibro);
    });

    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

    const precioTotal = document.createElement("div");
    precioTotal.className = "precio-total";
    precioTotal.innerHTML = `Total a pagar: $ ${total}`

    contenedorCarrito.appendChild(precioTotal);


};

carritoCompras.addEventListener("click", pintarCarrito);

const eliminarLibro = () => {
    const foundName = carrito.find((element) => toString(element.nombre));
    carrito = carrito.filter((carritoName) => {
        return carritoName !== foundName;

    });
    carritoCounter();
    saveLocal();
    pintarCarrito();
}

const carritoCounter = () => {

    const carritoLength = carrito.length;

    localStorage.setItem("carritoLength", JSON.stringify(carritoLength))

    contadorCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));

}

carritoCounter();