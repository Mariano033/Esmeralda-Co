const names = [
    "Anillo de Plata", "Collar de Oro", "Pulsera de Cuero", "Anillo Full", "Anillos", "Anillo de Fuego", "anillo de plata" // ...más nombres aquí
];
const prices = [
    5000, 7500, 3200, 8000, 9000, 10000, 8005 // ...más precios aquí
];
const images = [
    "imagenes/anillo1plata.jpg", "imagenes/anillo2plata.jpg", "imagenes/anillo3plata.jpg" // ...más imágenes aquí
];

const productContainer = document.getElementById("productContainer");
let cart = [];
let totalAmount = 0; // Total de la compra

// Función para crear las tarjetas de productos
function createProductCards(filter = "") {
    let contentHtml = ""; // Reiniciar el contenido HTML

    for (let i = 0; i < names.length; i++) {
        if (names[i].toLowerCase().includes(filter.toLowerCase())) {
            contentHtml += `
                <div class="card tar product" data-name="${names[i]}">
                    <img src="${images[i % images.length]}" class="card-img-top joya" alt="${names[i]}">
                    <div class="card-body tra2">
                        <p class="card-text text-center">${names[i]}</p>
                        <p class="card-text text-center">$${prices[i]}</p>
                        <button class="btn btn-success add-to-cart" data-name="${names[i]}" data-price="${prices[i]}">Agregar al carrito</button>
                    </div>
                </div>
            `;
        }
    }

    if (!contentHtml) {
        contentHtml += `<p class="text-center aviso" style="color: red;">El producto no se encuentra disponible.</p>`;
    }

    productContainer.innerHTML = contentHtml;

    // Agregar evento a los botones de "Agregar al carrito"
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Inicializar las tarjetas al cargar la página
createProductCards();

// Función para agregar productos al carrito
function addToCart(event) {
    const name = event.target.getAttribute('data-name');
    const price = parseFloat(event.target.getAttribute('data-price'));
    cart.push({ name, price });
    totalAmount += price; // Sumar el precio al total

    // Mostrar mensaje estético con la descripción del producto
    showProductAddedMessage(name, price);
    updateCartIcon();
}

// Función para mostrar el mensaje de producto agregado
function showProductAddedMessage(name, price) {
    const message = document.createElement('div');
    message.className = 'alert alert-success';
    message.innerHTML = `<strong>Producto agregado:</strong> ${name} - $${price} <button class="btn btn-danger btn-sm" onclick="removeFromCart('${name}')">Borrar</button>`;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 3000); // El mensaje se cierra después de 3 segundos
}

// Función para actualizar el icono del carrito
function updateCartIcon() {
    const cartIcon = document.getElementById("cartIcon");
    cartIcon.textContent = cart.length; // Actualiza el número de productos en el carrito
}

// Función para remover productos del carrito
function removeFromCart(name) {
    const productIndex = cart.findIndex(product => product.name === name);
    if (productIndex > -1) {
        totalAmount -= cart[productIndex].price; // Restar el precio del total
        cart.splice(productIndex, 1); // Eliminar el producto del carrito
        updateCartIcon(); // Actualizar el icono del carrito
    }
}

// Función para finalizar la compra
function finalizePurchase() {
    if (cart.length === 0) {
        alert("El carrito está vacío. Agrega productos antes de finalizar la compra.");
        return;
    }

    const productDetails = cart.map(product => `${product.name} - $${product.price}`).join("\n");
    const message = `Detalles de la compra:\n${productDetails}\nTotal: $${totalAmount}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/3518042065?text=${encodedMessage}`, '_blank'); // Cambiar el número de WhatsApp según sea necesario

    cart = []; // Limpiar el carrito
    totalAmount = 0; // Reiniciar el total
    updateCartIcon(); // Actualizar el icono del carrito
}

// Evento para el botón de finalizar compra
const finalizeButton = document.createElement('button');
finalizeButton.textContent = 'Finalizar Compra';
finalizeButton.className = 'btn btn-primary';
finalizeButton.onclick = finalizePurchase;
document.body.appendChild(finalizeButton);