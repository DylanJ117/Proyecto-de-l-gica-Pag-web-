//listado de productos que almacenara despues el local storage
const productos = {
    "manzana": { precio: 5.00, imagen: "" },
    "naranja": { precio: 5.00, imagen: "" },
    "lavadora": { precio: 1500.0, imagen: "" },
    "comida para perro": { precio: 35.99, imagen: "" },
    "comida para gato": { precio: 35.99, imagen: "" },
    "jamon": { precio: 15.00, imagen: "" },
    "lays": { precio: 18.23, imagen: "" },
    "coca-cola": { precio: 18.18, imagen: "" },
    "desodorante": { precio: 23.25, imagen: "" },
    "pan": { precio: 26.29, imagen: "" },
    "huevos": { precio: 23.25, imagen: "" },
    "cereal": { precio: 19.23, imagen: "" },
    "leche": { precio: 12.29, imagen: "" },
    "yogurt": { precio: 26.29, imagen: "" },
    "acetaminofen": { precio: 20.00, imagen: "" },
    "nintendo switch":{precio: 3000.0, imagen: ""},
    "licuadora":{precio: 800.00, imagen: ""},
    "play 5":{precio: 5000.0, imagen: ""},
    "xbox serie x":{precio: 5000.00, imagen: ""}
    
};

let carrito = JSON.parse(localStorage.getItem('carrito')) || []; //recupera la informacion bajo el nombre de carrito del local storage y lo convierte en un objeto 

//esta funcion sirve para agregar la cantidad y el producto a la funcion carrito para posteriormente guardarlo en el local storage 
function agregarAlCarrito(producto, cantidad) { 
    cantidad = parseInt(cantidad); 
    let found = false;

    for (let item of carrito) {
        if (item.producto === producto) {
            item.cantidad += cantidad; 
            found = true;
            break;
        }
    }


    if (!found) {
        carrito.push({ producto, cantidad });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito)); //convierte el objeto del local storage en una cadena Json
    alert(`${producto.charAt(0).toUpperCase() + producto.slice(1)} agregado al carrito.`);
}

function irACarrito() {
    window.location.href = 'carrito.html';//esta funcion sirve para ir al index del carrito desde el catalogo 
}

function irABuscarProducto() {
    window.location.href = 'buscar.html';//esta funcion sirve para ir al index de buscar desde el catalogo 
}
//esta funcion sirve para realizar la busqueda individual de productos en el index de buscar
function mostrarPrecio() {
    const producto = document.getElementById('producto').value.toLowerCase();
    const precio = productos[producto]?.precio;
    if (precio !== undefined) {
        document.getElementById('resultado').innerText = `Precio: Q${precio}`;
    } else {
        document.getElementById('resultado').innerText = 'Producto no encontrado';
    }
}

function irACatalogo() {
    window.location.href = 'catalogo.html'; //esta funcion sirve para regresar al catalogo desde el index de buscar 
}
//esta funcion sirve para calcular el porcentaje a utilizar en base a la cantidad de productos 
function calcularDescuento(total, cantidadTotal) {
    let descuento = 0;
    let porcentaje = 0;
    if (cantidadTotal >= 10) {
        descuento = total * 0.10;
        porcentaje = 10;
    } else if (cantidadTotal >= 5) {
        descuento = total * 0.05;
        porcentaje = 5;
    }
    return { descuento, porcentaje };
}
//esta funcion muestra lo que se almaceno del local estorage en la funcion de carrito en esta misma funcion se suma el precio establecido de cada producto y se multiplica por el descuento obtenido
function mostrarCarrito() {
    let carritoDiv = document.getElementById('carrito');
    carritoDiv.innerHTML = '';
    let total = 0;
    let cantidadTotal = 0;

    carrito.forEach(item => {
        let producto = item.producto;
        let cantidad = item.cantidad;
        let precio = productos[producto].precio;
        carritoDiv.innerHTML += `<p>${producto.charAt(0).toUpperCase() + producto.slice(1)} - Q${precio.toFixed(2)} x ${cantidad} = Q${(precio * cantidad).toFixed(2)}</p>`;
        total += precio * cantidad;
        cantidadTotal += cantidad;
    });

    let { descuento, porcentaje } = calcularDescuento(total, cantidadTotal);
    let totalConDescuento = total - descuento;

    carritoDiv.innerHTML += `<p>Total: Q${total.toFixed(2)}</p>`;
    carritoDiv.innerHTML += `<p>Descuento: ${porcentaje}% (Q${descuento.toFixed(2)})</p>`;
    carritoDiv.innerHTML += `<p>Total con Descuento: Q${totalConDescuento.toFixed(2)}</p>`;
}
//esta funcion sirve para ir al index de datos 
function irAAgregarDatos() {
    window.location.href = 'datos.html';
}
//esta funcion regresa al catalogo desde el carrito 
function regresarAlCatalogo(){
    window.location.href = 'catalogo.html'
}
// esta funcion guarda los datos del cliente en el local estorage y nos envia al index de la factura 
function finalizarCompra() {
    const nombre = document.getElementById('nombre').value;
    const nit = document.getElementById('nit').value;
    const pago = parseFloat(document.getElementById('pago').value);
    if (nombre && nit && pago) {
        localStorage.setItem('cliente', JSON.stringify({ nombre, nit, pago }));
        window.location.href = 'factura.html';
    } else {
        alert('Por favor, complete todos los campos.');
    }
}
//esta funcion muestra todo lo recolectado anteriormente en el localstorage y lo muestra en forma de lista en el index de la factura
function mostrarFactura() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const cliente = JSON.parse(localStorage.getItem('cliente')) || {};

    let facturaDiv = document.getElementById('factura');
    facturaDiv.innerHTML = '<h1>Factura de Compra</h1>';
    facturaDiv.innerHTML += `<p>Nombre: ${cliente.nombre}</p>`;
    facturaDiv.innerHTML += `<p>NIT: ${cliente.nit}</p>`;
    facturaDiv.innerHTML += '<h2>Productos:</h2>';

    let total = 0;
    let cantidadTotal = 0;
    carrito.forEach(item => {
        let producto = item.producto;
        let cantidad = item.cantidad;
        let precio = productos[producto].precio;
        facturaDiv.innerHTML += `<p>${producto.charAt(0).toUpperCase() + producto.slice(1)} - Q${precio.toFixed(2)} x ${cantidad} = Q${(precio * cantidad).toFixed(2)}</p>`;
        total += precio * cantidad;
        cantidadTotal += cantidad;
    });

    let { descuento, porcentaje } = calcularDescuento(total, cantidadTotal);
    let totalConDescuento = total - descuento;
    let cambio = cliente.pago - totalConDescuento;

    facturaDiv.innerHTML += `<h2>Total: Q${total.toFixed(2)}</h2>`;
    facturaDiv.innerHTML += `<h2>Descuento: ${porcentaje}% (Q${descuento.toFixed(2)})</h2>`;
    facturaDiv.innerHTML += `<h2>Total con Descuento: Q${totalConDescuento.toFixed(2)}</h2>`;
    facturaDiv.innerHTML += `<h2>Cantidad Pagada: Q${cliente.pago.toFixed(2)}</h2>`;
    facturaDiv.innerHTML += `<h2>Cambio: Q${cambio.toFixed(2)}</h2>`;
}
//esta funcion borra la informacion guardada en el localstorage y nos regresa al catalogo para iniciar nuevamente el proceso
function borrarInformacion() {
    localStorage.clear();
    window.location.href = 'catalogo.html';
}
//  esta funcion nos envia al index sorpresa  
function sorpresa(){
    window.location.href = 'sorpresa.html';
}

//funcion volver al index
function VolverAlIndex(){
    window.location.href = "/Principal/Principal.html"
}