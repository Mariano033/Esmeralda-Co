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
        id: 'joyas-plata', // ID para Joyas de Plata
        title: 'Joyas de Plata',
        products: [
            
            { id: 1, name: 'Anillo Feli con Cubic', price: 100, image: './imagenes/Anillo Feli con cubic PLATA.jpg' },
            { id: 2, name: 'Anillo Hortencia con Cubic', price: 150, image: 'imagenes/Anillo Hortensia con cubic PLATA.jpg' },
            { id: 3, name: 'Anillo Florencia con Cubic', price: 80, image: './imagenes/Anillo Florencia con cubic PLATA.jpg' },
            { id: 4, name: 'Anillo Margarita', price: 100, image: 'imagenes/Anillo Margarita PLATA.jpg' },
            { id: 5, name: 'Anillo Rosa con Cubic', price: 150, image: 'imagenes/Anillo Rosa con cubic PLATA.jpg' },
            { id: 6, name: 'Anillo Theo con Cubic', price: 150, image: 'imagenes/Anillo Theo con cubicPLATA.jpg' },
            { id: 7, name: 'Anillo Corona con Cubic', price: 150, image: 'imagenes/Anillos corona facetada PLATA 925.jpg' },

            { id: 8, name: 'Abridor Comillas', price: 100, image: 'imagenes/Abridor comillas PLATA.jpg' },
            { id: 9, name: 'Abridor Cruz', price: 150, image: 'imagenes/Abridor cruz PLATA.jpg' },
            { id: 10, name: 'Abridor Gota Azul', price: 80, image: 'imagenes/Abridor gota azul PLATA.jpg' },
            { id: 11, name: 'Abridor Mari', price: 100, image: 'imagenes/Abridor Mari PLATA.jpg' },
            { id: 12, name: 'Abridor Susi', price: 150, image: 'imagenes/Abridor Susi PLATA.jpg' },
            { id: 13, name: 'Abridor Triángulo', price: 150, image: 'imagenes/Abridor triángulo PLATA.jpg' },
            { id: 14, name: 'Abridor Cuadrado', price: 150, image: 'imagenes/Abridores cuadrados PLATA.jpg' },
            { id: 15, name: 'Argolla Corazón', price: 150, image: 'imagenes/Argolla corazón PLATA.jpg' },
            { id: 16, name: 'Argolla Guadalupe', price: 150, image: 'imagenes/Argolla Guadalupe PLATA.jpg' },
            { id: 17, name: 'Argolla Infinito', price: 150, image: 'imagenes/Argolla infinito PLATA.jpg' },
            { id: 18, name: 'Argolla', price: 150, image: '' },
            { id: 19, name: 'Argolla ', price: 150, image: '' },
            
        ],
    },
    {
        id: 'acero-blanco', // ID para Acero Blanco
        title: 'Acero Blanco',
        products: [
            
            { id: 20, name: 'Anillo Corazones con Cubic', price: 100, image: 'imagenes/Anillo corazones con cubic AB.jpg' },
            { id: 21, name: 'Anillo Cleo con Cubic', price: 150, image: 'imagenes/Anillo Cleo con Cubic AB.jpg' },
            { id: 22, name: 'Anillo Alas con Corazón', price: 80, image: 'imagenes/Anillo alas con corazón AB.jpg' },
            { id: 23, name: 'Anillo  Amelia', price: 100, image: 'imagenes/Anillo Amelia AB.jpg' },
            { id: 24, name: 'Anillo Esmeralda', price: 150, image: 'imagenes/Anillo Esmeralda AB.jpg' },
            { id: 25, name: 'Anillo Estrella y Luna', price: 150, image: 'imagenes/Anillo estrella y luna AB.jpg' },
            { id: 26, name: 'Anillo Flores', price: 150, image: 'imagenes/Anillo flores AB.jpg' },
            { id: 27, name: 'Anillo Gota con Cubic', price: 150, image: 'imagenes/Anillo gota con Cubic AB.jpg' },
            
            { id: 28, name: 'Anillo Hazel', price: 150, image: 'imagenes/Anillo Hazel AB.jpg' },
            { id: 29, name: 'Anillo Mariposa', price: 150, image: 'imagenes/Anillo mariposa AB.jpg' },
            { id: 30, name: 'Anillo Hojas', price: 150, image: 'imagenes/Anillo hojas AB.jpg' },
            { id: 31, name: 'Anillo Olas con Cubic', price: 150, image: 'imagenes/Anillo olas con Cubic AB.jpg' },

            { id: 32, name: 'Anillo Ondas con Corazón', price: 150, image: 'imagenes/Anillo Ondas con corazón AB.jpg' },
            { id: 33, name: 'Anillo Ondas y Bolitas', price: 150, image: 'imagenes/Anillo ondas y bolitas AB.jpg' },
            { id: 34, name: 'Anillo Serpiente', price: 150, image: 'imagenes/Anillo serpiente detalles AB .jpg' },
            { id: 35, name: 'Anillo Rayo', price: 150, image: 'imagenes/Anillo Rayo con Cubic AB.jpg' },

            { id: 36, name: 'Anillo Serpeinte', price: 150, image: 'imagenes/Anillo serpiente detalles AB .jpg' },
            { id: 37, name: 'Anillo Theo', price: 150, image: 'imagenes/Anillo Theo AB.jpg' },
            { id: 38, name: 'Anillo Ola', price: 150, image: 'imagenes/Anillos ola AB.jpg' },

            { id: 39, name: 'Argolla Nat', price: 150, image: 'imagenes/Argolla Nat AB.jpg' },
            { id: 40, name: 'Argolla Dana con Cubic', price: 150, image: 'imagenes/Argolla Dana con cubic de colores AB.jpg' },
            { id: 41, name: 'Argolla Estrella con Cubic', price: 150, image: 'imagenes/Argolla estrella con cubic de colores AB.jpg' },
            { id: 42, name: 'Argolla Clasicas', price: 150, image: 'imagenes/Argollas clasicas AB.jpg' },
            { id: 43, name: 'Argolla Dobles con Cubic ', price: 150, image: 'imagenes/Argollas dobles con cubic AB.jpg' },
            { id: 44, name: 'Argolla Duquesa con Cubic ', price: 150, image: 'imagenes/Argollas duquesa con cubic AB.jpg' },

            { id: 45, name: 'Argolla Nat', price: 150, image: 'imagenes/Argollas Nat AB.jpg' },
            { id: 46, name: 'Argolla Stef', price: 150, image: 'imagenes/Argollas Stef AB.jpg' },
            { id: 47, name: 'Aro Trepador ', price: 150, image: 'imagenes/Aro trepador con cuff de mariposa con cubic AB.jpg' },
            { id: 48, name: 'Argolla Estrella Calada', price: 150, image: 'imagenes/Argollitas Estella caladas AB.jpg' },
            { id: 49, name: 'Argolla Estrella ', price: 150, image: 'imagenes/Argollas estrellas AB.jpg' },
            { id: 50, name: 'Aros Círculo con Cubic ', price: 150, image: 'imagenes/Aros círculo con cubic AB.jpg' },

            { id: 51, name: 'Aros Círculo', price: 150, image: 'imagenes/Aros círculos AB.jpg' },
            { id: 52, name: 'Aros Colgantes de Corazones ', price: 150, image: 'imagenes/Aros colgantes de corazón con cubic AB.jpg' },
            { id: 53, name: 'Aros Colgantes Gotas ', price: 150, image: 'imagenes/Aros colgantes gotas AB.jpg' },
            { id: 54, name: 'Aros Estrella con Cubic', price: 150, image: 'imagenes/Aros estrellas con cubic AB.jpg' },
            { id: 55, name: 'Aros Hojas con Cubic', price: 150, image: 'imagenes/Aros hojas con cubic AB.jpg' },
            { id: 56, name: 'Aros Matilda Con Cubic ', price: 150, image: 'imagenes/Aros Matilda con cubicAB.jpg' },


            { id: 57, name: 'Aros Rectángulo con Cubic', price: 150, image: 'imagenes/Aros rectángulo con cubic AB.jpg' },
            { id: 58, name: 'Aros Nudos ', price: 150, image: 'imagenes/Aros nudos AB.jpg' },
            { id: 59, name: 'Aros Serpiente con Cubic ', price: 150, image: 'imagenes/Aros serpiente con cubic AB.jpg' },
            { id: 60, name: 'Aros Sinfín con Cubic', price: 150, image: 'imagenes/Aros sinfín con cubic AB.jpg' },
            { id: 61, name: 'Cuff Perú con Cubic', price: 150, image: 'imagenes/Cuff Perú con cubic AB.jpg' },
            { id: 62, name: 'Cuff  Rectángulos  ', price: 150, image: 'imagenes/Cuff rectángulos (Acero quirúrgico) AQ.jpg' },
            { id: 63, name: 'Cuff Serpiente con Cubic ', price: 150, image: 'imagenes/Cuff serpiente con cubic AB.jpg' },

            { id: 64, name: 'Cadena Figaro 45cm', price: 150, image: 'imagenes/Cadena Fígaro 45cm AB.jpg' },
            { id: 65, name: 'Cadena Rolo 7mm 50cm', price: 150, image: 'imagenes/Cadena rolo 7mm 50cm AB.jpg' },
            { id: 66, name: 'Collar Mariposa', price: 150, image: 'imagenes/Collar mariposas AB.jpg' },
            { id: 67, name: 'Collar con Corazón Hueco', price: 150, image: 'imagenes/Collar con corazón hueco AB.jpg' },
            { id: 68, name: 'Collar y Dije Rectangular', price: 150, image: 'imagenes/Collar y dije rectangular con cubic 60cm AB.jpg' },
            { id: 69, name: 'Cadena  ', price: 150, image: 'imagenes/IMG_20241104_153002364.jpg' },
            { id: 70, name: 'Cadena', price: 150, image: 'imagenes/IMG_20241017_170252121.jpg' },
        ],
    },
    {
        id: 'acero-dorado', // ID para Acero Dorado
        title: 'Acero Dorado',
        products: [
            { id: 6, name: 'Anillo de Acero Dorado', price: 140, image: './imagenes/anillo3acero.jpg' },
            { id: 7, name: 'Collar de Acero Dorado', price: 160, image: './imagenes/anillo4acero.jpg' },
        ],
    },
    {
        id: 'acero-rose', // ID para Acero Rose
        title: 'Acero Rose',
        products: [
            { id: 8, name: 'Argolla Tere', price: 150, image: 'imagenes/Argolla Tere AR (2).jpg' },
            { id: 9, name: 'Collar de Acero Rose', price: 170, image: './imagenes/anillo6acero.jpg' },
        ],
    },
    {
        id: 'bolsos', // ID para Bolsos
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