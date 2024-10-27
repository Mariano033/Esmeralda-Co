const names = [
    "Anillo de Plata", "Collar de Oro", "Pulsera de Cuero", "Anillo Full", "Anillos", "Anillo de Fuego", "Anillo de Plata"
];
const prices = [
    5000, 7500, 3200, 8000, 9000, 10000, 8005
];
const images = [
    "imagenes/anillo1plata.jpg", "imagenes/anillo2plata.jpg", "imagenes/anillo3plata.jpg"
];

const productContainer = document.getElementById("productContainer");
const searchInput = document.getElementById("searchInput");
let cart = [];
let totalAmount = 0; // Para mantener el total del carrito

// Función para crear las tarjetas de productos
function createProductCards(filter = "") {
    let contentHtml = "";

    

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

    productContainer.innerHTML = contentHtml;

    // Agregar funcionalidad a los botones de "Agregar al carrito"
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            const productName = this.getAttribute("data-name");
            const productPrice = parseFloat(this.getAttribute("data-price"));
            addToCart(productName, productPrice);
        });
    });
}

// Función para agregar productos al carrito
function addToCart(productName, productPrice) {
    const product = cart.find(item => item.name === productName);
    if (product) {
        product.quantity += 1;
    } else {
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    }

    totalAmount += productPrice; // Sumar el precio al total
    updateCartIcon();
}

// Función para actualizar el ícono del carrito
function updateCartIcon() {
    const cartIcon = document.getElementById("cartIcon");
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartIcon.textContent = totalItems;
}

// Función para mostrar el resumen del carrito
function showCartSummary() {
    const cartSummary = document.getElementById("cartSummary");
    const totalAmountDisplay = document.getElementById("totalAmountDisplay");
    cartSummary.innerHTML = "";
    
    cart.forEach(item => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `${item.name} - $${item.price} x ${item.quantity} 
        <button class="btn btn-danger btn-sm" onclick="removeFromCart('${item.name}')">Eliminar</button>`;
        cartSummary.appendChild(listItem);
    });

    totalAmountDisplay.textContent = totalAmount.toFixed(2); // Mostrar el total
    const cartModal = new bootstrap.Modal(document.getElementById("cartModal"));
    cartModal.show();
}

// Función para eliminar productos del carrito
function removeFromCart(productName) {
    const productIndex = cart.findIndex(item => item.name === productName);
    if (productIndex !== -1) {
        totalAmount -= cart[productIndex].price * cart[productIndex].quantity; // Restar del total
        cart.splice(productIndex, 1); // Eliminar producto del carrito
    }
    updateCartIcon();
    showCartSummary();
}

// Función para finalizar la compra y compartir en WhatsApp
function finalizePurchase() {
    let message = "Resumen de tu compra:\n";
    cart.forEach(item => {
        message += `${item.quantity}x ${item.name} - $${item.price}\n`;
    });
    message += `Total: $${totalAmount.toFixed(2)}\n`;
    message += "Datos bancarios: [Eseralda2024.mp]";

    const whatsappUrl = `https://wa.me/3518042065?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");

    // Reiniciar el carrito
    cart = [];
    totalAmount = 0;
    updateCartIcon();
    const cartModal = bootstrap.Modal.getInstance(document.getElementById("cartModal"));
    cartModal.hide();
}

// Filtrar productos en tiempo real
searchInput.addEventListener("input", function () {
    const filter = searchInput.value;
    createProductCards(filter);
});

// Cargar los productos al cargar la página
createProductCards();