// Arreglo para almacenar los productos en el carrito
let cart = [];
const cartSummary = document.getElementById('cartSummary');
const totalAmountDisplay = document.getElementById('totalAmountDisplay');
const cartIcon = document.getElementById('cartIcon');

// Función para agregar un producto al carrito
function addToCart(product) {
    cart.push(product);
    updateCart();
}

// Actualiza el carrito
function updateCart() {
    // Limpiar el resumen del carrito
    cartSummary.innerHTML = '';
    let totalAmount = 0;

    cart.forEach((product, index) => {
        const li = document.createElement('li');
        li.textContent = `${product.name} - $${product.price}`;
        li.innerHTML += ` <button onclick="removeFromCart(${index})">Eliminar</button>`;
        cartSummary.appendChild(li);
        totalAmount += product.price;
    });

    totalAmountDisplay.textContent = totalAmount;
    cartIcon.textContent = cart.length; // Actualizar el ícono del carrito
}

// Función para eliminar un producto del carrito
function removeFromCart(index) {
    cart.splice(index, 1); // Eliminar el producto del carrito
    updateCart(); // Actualizar el carrito después de eliminar
}

// Mostrar el resumen del carrito en el modal
function showCartSummary() {
    const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
    cartModal.show();
}

// Reiniciar el carrito al cerrar el modal
function resetCart() {
    cart = [];
    updateCart();
}

// Finalizar compra
function finalizePurchase() {
    if (cart.length === 0) {
        alert("El carrito está vacío. Agrega productos antes de finalizar la compra.");
        return;
    }

    const purchaseDetails = cart.map(product => `${product.name} - $${product.price}`).join('\n');
    const totalAmount = cart.reduce((sum, product) => sum + product.price, 0);

    const message = `Detalles de la compra:\n${purchaseDetails}\nTotal: $${totalAmount}`;
    const whatsappLink = "https://wa.me/message/ZGSVAUVGJTEHI1";

    window.open(whatsappLink, '_blank'); // Abrir WhatsApp con los detalles
    resetCart(); // Reiniciar el carrito después de finalizar la compra
}

// Crear productos de ejemplo y agregar al contenedor
const products = [
    { id: 1, name: 'Anillo de Plata', price: 100, image: './imagenes/anillo1plata.jpg' },
    { id: 2, name: 'Collar de Plata', price: 150, image: './imagenes/anillo4plata.jpg' },
    { id: 3, name: 'Pulsera de Plata', price: 80, image: './imagenes/anillo5plata.jpg' },
    { id: 4, name: 'Pendientes de Plata', price: 120, image: './imagenes/anillo9plata.jpg' },
];

// Agregar productos al contenedor
const productContainer = document.getElementById('productContainer');
products.forEach(product => {
    const card = document.createElement('div');
    card.classList.add('card', 'm-2', 'text-center');
    card.style.width = '18rem';

    card.innerHTML = `
        <img src="${product.image}" class="card-img-top" alt="${product.name}">
        <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">$${product.price}</p>
            <button class="btn btn-success" onclick="addToCart({ name: '${product.name}', price: ${product.price} })">Agregar al carrito</button>
        </div>
    `;

    productContainer.appendChild(card);
});