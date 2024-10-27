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
                        <button class="btn btn-primary add-to-cart" data-name="${names[i]}" data-price="${prices[i]}">Agregar al carrito</button>
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
    alert(`${name} ha sido agregado al carrito.`);
}

// Agregar evento al campo de búsqueda
document.getElementById("searchInput").addEventListener("input", function() {
    createProductCards(this.value);
});

// Función para mostrar el resumen del carrito y enviar por WhatsApp
function showCartSummary() {
    if (cart.length === 0) {
        alert("El carrito está vacío.");
        return;
    }

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const cartSummary = cart.map(item => `${item.name}: $${item.price}`).join("\n");
    const message = `Resumen de tu compra:\n${cartSummary}\nTotal: $${total}\n¡Gracias por tu compra!`;
    const phoneNumber = "3518042065"; // Cambia este número al de tu empresa
    const whatsappLink ="https://wa.me/message/ZGSVAUVGJTEHI1" ;

    // Abrir WhatsApp
    window.open(whatsappLink, '_blank');
}

// Crear un botón para ver el resumen del carrito
const viewCartButton = document.createElement('button');
viewCartButton.textContent = 'Ver carrito';
viewCartButton.className = 'btn btn-success';
viewCartButton.style.position = 'fixed';
viewCartButton.style.bottom = '20px';
viewCartButton.style.right = '20px';
viewCartButton.addEventListener('click', showCartSummary);
document.body.appendChild(viewCartButton);