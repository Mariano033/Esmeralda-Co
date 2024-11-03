let cart = [];
const cartSummary = document.getElementById('cartSummary');
const totalAmountDisplay = document.getElementById('totalAmountDisplay');
const cartIcon = document.getElementById('cartIcon');

// Función para agregar un producto al carrito
function addToCart(product) {
    cart.push(product);
    updateCart();
    showNotification(); // Mostrar notificación al agregar al carrito
}

// Actualiza el carrito
function updateCart() {
    // Limpiar el resumen del carrito
    cartSummary.innerHTML = '';
    let totalAmount = 0;

    cart.forEach((product, index) => {
        const li = document.createElement('li');
        li.textContent = `${product.name} - $${product.price}`;
        li.innerHTML += ` <button class="eliminar" onclick="removeFromCart(${index})">Eliminar</button>`;
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
    updateCart(); // Actualizar el carrito antes de mostrar el modal
    cartModal.show();
}

// No reiniciar el carrito al cerrar el modal
function closeModal() {
    const cartModal = bootstrap.Modal.getInstance(document.getElementById('cartModal'));
    cartModal.hide();
}

// Finalizar compra
async function finalizePurchase() {
    if (cart.length === 0) {
        alert("El carrito está vacío. Agrega productos antes de finalizar la compra.");
        return;
    }

    const purchaseDetails = cart.map(product => `${product.name} - $${product.price}`).join('\n');
    const totalAmount = cart.reduce((sum, product) => sum + product.price, 0);
    const message = `Detalles de la compra:\n${purchaseDetails}\nTotal: $${totalAmount}`;

    // Generar PDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.text("Resumen de la compra", 10, 10);
    doc.text(message, 10, 20);

    // Guardar el PDF
    const pdfOutput = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfOutput);

    // Descargar el PDF
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'resumen_compra.pdf'; // Nombre del archivo
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Mensaje para WhatsApp
    const whatsappMessage = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/543518042065?text=${whatsappMessage}`;

    // Abrir WhatsApp con el mensaje
    window.open(whatsappLink, '_blank');

    // Instrucciones al usuario
    alert("El PDF se ha descargado. Puedes compartirlo manualmente por WhatsApp.");

    // Limpiar el carrito después de finalizar la compra
    cart = []; 
    updateCart(); // Actualizar la interfaz después de la compra
}

// Crear productos de ejemplo y agregar al contenedor
const categories = [
    {
        title: 'Joyas de Plata',
        products: [
            { id: 1, name: 'Anillo de Plata', price: 100, image: './imagenes/anillo1plata.jpg' },
            { id: 2, name: 'Collar de Plata', price: 150, image: './imagenes/anillo4plata.jpg' },
            { id: 3, name: 'Pulsera de Plata', price: 80, image: './imagenes/anillo5plata.jpg' },
            { id: 4, name: 'Anillo de Plata', price: 100, image: './imagenes/anillo1plata.jpg' },
            { id: 5, name: 'Collar de Plata', price: 150, image: './imagenes/anillo4plata.jpg' },
        ],
    },
    {
        title: 'Acero Blanco',
        products: [
            { id: 4, name: 'Anillo de Acero Blanco', price: 120, image: './imagenes/anillo1acero.jpg' },
            { id: 5, name: 'Collar de Acero Blanco', price: 130, image: './imagenes/anillo2acero.jpg' },
        ],
    },
    {
        title: 'Acero Dorado',
        products: [
            { id: 6, name: 'Anillo de Acero Dorado', price: 140, image: './imagenes/anillo3acero.jpg' },
            { id: 7, name: 'Collar de Acero Dorado', price: 160, image: './imagenes/anillo4acero.jpg' },
        ],
    },
    {
        title: 'Acero Rose',
        products: [
            { id: 8, name: 'Anillo de Acero Rose', price: 150, image: './imagenes/anillo5acero.jpg' },
            { id: 9, name: 'Collar de Acero Rose', price: 170, image: './imagenes/anillo6acero.jpg' },
        ],
    },
    {
        title: 'Bolsos',
        products: [
            { id: 10, name: 'Bolso de Cuero', price: 200, image: './imagenes/bolso1.jpg' },
            { id: 11, name: 'Bolso de Tela', price: 80, image: './imagenes/bolso2.jpg' },
        ],
    },
];





// Agregar productos al contenedor
const productContainer = document.getElementById('productContainer');

// Recorrer las categorías y productos para mostrarlos
categories.forEach(category => {
    // Crear un contenedor para la categoría
    const categoryContainer = document.createElement('div');
    categoryContainer.classList.add('my-4'); // Margen vertical para separación

    // Crear un título para la categoría
    const categoryTitle = document.createElement('h2');
    categoryTitle.textContent = category.title;
    categoryTitle.classList.add('text-center'); // Centrar el título
    categoryContainer.appendChild(categoryTitle);

    // Crear un contenedor para los productos
    const productWrapper = document.createElement('div');
    productWrapper.classList.add('d-flex', 'justify-content-center', 'flex-wrap'); // Alinear productos al centro y permitir wrap

    category.products.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('card', 'm-2', 'text-center');
        card.style.width = '12rem'; // Ajusta el ancho según sea necesario

        card.innerHTML = `
            <img src="${product.image}" class="card-img-top" alt="${product.name}">
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">$${product.price}</p>
                <button class="btn btn-success botonn" onclick="addToCart({ name: '${product.name}', price: ${product.price} })">Agregar al carrito</button>
            </div>
        `;

        productWrapper.appendChild(card);
    });

    categoryContainer.appendChild(productWrapper); // Agregar el contenedor de productos a la categoría
    productContainer.appendChild(categoryContainer); // Agregar el contenedor de categoría al contenedor principal
});

// Mostrar notificación al agregar un producto
function showNotification() {
    const notification = document.getElementById('notification');
    notification.classList.remove('hidden');
    notification.classList.add('show');

    // Desaparecer después de 3 segundos
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.classList.add('hidden');
        }, 500); // Sincronizado con el tiempo de la animación
    }, 3000);
}