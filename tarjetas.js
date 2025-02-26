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
        id: 'plata', // ID para Joyas de Plata
        title: 'Joyas de Plata 925',
        products: [
            
           /*{ id: 1, name: 'Anillo Feli con Cubic', price: 100, image: './imagenes/Anillo Feli con cubic PLATA.jpg' },*/
            { id:2, name: 'Anillo Hortencia con Cubic T:17', price: 15000, image: 'imagenes/Anillo Hortensia con cubic PLATA.jpg' },
            { id: 3, name: 'Anillo Florencia con Cubic T:16', price:15000, image: './imagenes/Anillo Florencia con cubic PLATA.jpg' },
            { id: 4, name: 'Anillo Margarita con Cubic T:18', price: 15000, image: 'imagenes/Anillo Margarita PLATA.jpg' },
            { id: 5, name: 'Anillo Onda T:16 ', price: 14000, image: 'imagenes/Anillo ondas PLATA 925' },
            { id: 6, name: 'Anillo Theo con Cubic T:16', price: 16000, image: 'imagenes/Anillo Theo con cubicPLATA.jpg' },
            { id: 7, name: 'Anillo Corona Facetada T:17', price:12000, image: 'imagenes/Anillos corona facetada PLATA 925.jpg' },

            { id: 8, name: 'Abridor Comillas', price:7000, image: 'imagenes/Abridor comillas PLATA.jpg' },
            { id: 9, name: 'Abridor Cruz', price:7000, image: 'imagenes/Abridor cruz PLATA.jpg' },
            { id: 10, name: 'Abridor Gota Azul', price:7000, image: 'imagenes/Abridor gota azul PLATA.jpg' },
           /*{ id: 11, name: 'Abridor Mari Mari', price:7000, image: 'imagenes/Abridor Mari PLATA.jpg' }, */
           /* { id: 12, name: 'Abridor Susi', price:7000, image: 'imagenes/Abridor Susi PLATA.jpg' }, */
           /* { id: 13, name: 'Abridor Triángulo', price: 150, image: 'imagenes/Abridor triángulo PLATA.jpg' },*/
           /* { id: 14, name: 'Abridor Cuadrado', price:7000, image: 'imagenes/Abridores cuadrados PLATA.jpg' }, */
           /* { id: 15, name: 'Argolla Corazón', price:15000, image: 'imagenes/Argolla corazón PLATA.jpg' }, */
            { id: 16, name: 'Argolla Guadalupe', price:15000, image: 'imagenes/Argolla Guadalupe PLATA.jpg' },
           /* { id: 17, name: 'Argolla Infinito', price:12000, image: 'imagenes/Argolla infinito PLATA.jpg' }, */
          
            
        ],
    },
    
    {

        id: 'acero-blanco', // ID para Acero Blanco  
        title: 'Acero Blanco',
        products: [
            
            { id: 18, name: 'Anillo Serafina regulable', price: 13000, image: 'imagenes/ANILLO SERAFINA.jpeg' }, 
            { id:19, name: 'Anillo Sofía regulable con Cubic', price: 13000, image: 'imagenes/anillo sofia.jpeg' }, 
            { id: 20, name: 'Anillo Stella con Cubic', price:10000, image: 'imagenes/Anillo Stella AB.jpg' },
           /* { id: 21, name: 'Anillo Cleo con Cubic T:17', price:9000, image: 'imagenes/Anillo Cleo con Cubic AB.jpg' }, */
            { id: 22, name: 'Anillo Bella regulable con cubic', price:15000, image: 'imagenes/anillo bella con cubic (2).jpeg' },
            { id: 23, name: 'Anillo  Amelia T:17', price:10500, image: 'imagenes/Anillo Amelia AB.jpg' },
            { id: 24, name: 'Anillo Amor T:18', price:10500, image: 'imagenes/anillo amor ab.jpeg' }, 
            { id: 25, name: 'Anillo Estrella y Luna', price:7500, image: 'imagenes/Anillo estrella y luna AB.jpg' },
            { id: 26, name: 'Anillo Margaritas con Cubic T:17', price:9000, image: 'imagenes/Anillo flores AB.jpg' },
            { id: 27, name: 'Anillo Gota con Cubic T:14', price:10500, image: 'imagenes/Anillo gota con Cubic AB.jpg' },
            
            { id: 28, name: 'Anillo Hazel T:17', price:9500, image: 'imagenes/Anillo Hazel AB.jpg' },
            { id: 29, name: 'Anillo Julia regulable', price:13000, image: 'imagenes/Anillo Julia.jpeg' }, 
            { id: 30, name: 'Anillo Lara T:19', price:8000, image: 'imagenes/anillo lara.jpeg' }, 
            { id: 31, name: 'Anillo Olas con Cubic T:14', price:9500, image: 'imagenes/Anillo olas con Cubic AB.jpg' },

            { id: 32, name: 'Anillo Lola regulable', price:13000, image: 'imagenes/anillo lola.jpeg' }, 
            { id: 33, name: 'Anillo Nancy con cubic de colores T:18', price: 16500, image: 'imagenes/aniLLO NANCY CON CUBIC.jpeg' },
            { id: 34, name: 'Anillo Serpiente con escamas T:17', price:8000, image: 'imagenes/Anillo serpiente detalles AB .jpg' },
            { id: 35, name: 'Anillo Rayo T:14', price: 10000, image: 'imagenes/Anillo Rayo con Cubic AB.jpg' },

            { id: 36, name: 'Anillo Serpiente', price:7000, image: 'imagenes/Anillos serpiente lisa AB.jpg ' },
            { id: 37, name: 'Anillo Rita con Cubic T:15', price:10500, image: 'imagenes/Anillo Rita con cubic AB.jpg'},
            { id: 38, name: 'Anillo Nube regulable ', price:13000, image: 'imagenes/Anillo nube regulable.jpeg' }, 

            { id: 39, name: 'Argolla con perlas', price:12000, image: 'imagenes/argollas con perlas.jpeg' },
            { id: 40, name: 'Argolla Star', price:7000, image: 'imagenes/Argollas Star AB.jpg' },
            { id: 41, name: 'Aros Hojas', price:10000, image: 'imagenes/Aros de hojas AB.jpg' },
            { id: 42, name: 'Argolla Clasicas', price:7000, image: 'imagenes/Argollas clasicas AB.jpg' },
            { id: 43, name: 'Aros Feli con Cubic', price:10500, image: 'imagenes/Aros Feli con Cubic.jpg' },
            { id: 44, name: 'Argolla Inés con cubic ', price:13000 , image: 'imagenes/ARGOLLAS INES CON CUBIC.jpeg' },

            { id: 45, name: 'Argolla corazones con nacar y cubic', price: 11500, image: 'imagenes/Argollitas corazones con nacar y cubic.jpeg' },
            { id: 46, name: 'Argolla Sol con cubic', price:8500, image: 'imagenes/Argollitas Sol con cubic.jpeg' },
            { id: 47, name: 'Aro Trepador con Mariposa', price:7000, image: 'imagenes/Aro trepador con cuff de mariposa con cubic AB.jpg' },
            { id: 48, name: 'Aros colgantes Ariana con cubic', price: 13000, image: 'imagenes/AROS COLGANTES ARIANA CON CUBIC.jpeg' },
            { id: 49, name: 'Argolla Estrella ', price:12000, image: 'imagenes/Argollas estrellas AB.jpg' },
            { id: 50, name: 'Aros Corazón inflado con cubic ', price:11500, image: 'imagenes/AROS CORAZON INFLADO CON CUBIC (2).jpeg' },

            { id: 51, name: 'Aros Círculo', price:7500, image: 'imagenes/Aros círculos AB.jpg' },
            { id: 52, name: 'Aros Colgantes de Corazones ', price:7000, image: 'imagenes/Aros colgantes de corazón con cubic AB.jpg' },
            { id: 53, name: 'Aros Colgantes Gotas ', price:8000, image: 'imagenes/Aros colgantes gotas AB.jpg' },
            { id: 54, name: 'Aros Flores rosas con cristales', price:10500, image: 'imagenes/arOS FLORES ROSAS CON CRISTALES.jpeg' },
            { id: 55, name: 'Aros Gotas', price:11000, image: 'imagenes/Aros gotas.jpeg' },
            { id: 56, name: 'Aros Kout ', price:11500, image: 'imagenes/aros kout.jpeg' },
            { id: 136, name: 'Aros Nieve ', price:14000, image: 'imagenes/Aros nieve.jpeg' },
            { id: 137, name: 'Aros Renata ', price:11000, image: 'imagenes/AROS RENA.jpeg' },

            { id: 57, name: 'Aros Rectángulo con Cubic', price:9000, image: 'imagenes/Aros rectángulo con cubic AB.jpg' },
            { id: 58, name: 'Argollas corazones con cristales ', price: 13000, image: 'imagenes/argollas corazones con cristales.jpeg' },
            { id: 59, name: 'Aros Serpiente con Cubic ', price: 8500, image: 'imagenes/Aros serpiente con cubic AB.jpg' },
            { id: 60, name: 'Cuff Corazón Calado', price: 5000, image: 'imagenes/Aro cuff corazon calado.jpg' },
            { id: 61, name: 'Cuff Heart', price:5000, image: 'imagenes/Aro cuff Heart.jpg' },
            { id: 62, name: 'Cuff  Rectángulos AQ ', price:4000 , image: 'imagenes/Cuff rectángulos (Acero quirúrgico) AQ.jpg' },
            { id: 63, name: 'Cuff Serpiente con Cubic ', price:8000, image: 'imagenes/Cuff serpiente con cubic AB.jpg' },
            { id: 135, name: 'Cuff doble con cubic ', price:7000, image: 'imagenes/Aro cuff doble AB.jpeg' },
            { id: 135, name: 'Cuff Círculos con cubic ', price:7000, image: 'imagenes/cUFF CIRCULOS CON CUBIC.jpeg' },
            { id: 135, name: 'Cuff Estrella Fugaz  con cubic ', price:7000, image: 'imagenes/cuff estrella fugaz.jpeg' },
            { id: 135, name: 'Cuff Infinito encadenado con cubic ', price:8000, image: 'imagenes/Cuff infinito encadenado con cubic.jpeg' },
            { id: 135, name: 'Cuff Triple X con cubic ', price:8000, image: 'imagenes/Cuff triple x con cubic.jpeg' },
            { id: 135, name: 'Cuff Zigzag y piedras colgantes con cubic ', price:8000, image: 'imagenes/Cuff zigzag y piedras colgantes con cubic.jpeg' },

            { id: 64, name: 'Cadena Figaro 45cm', price:7000, image: 'imagenes/Cadena Fígaro 45cm AB.jpg' },
            { id: 65, name: 'Cadena Rolo 7mm 50cm', price:13000, image: 'imagenes/Cadena rolo 7mm 50cm AB.jpg' },
            { id: 66, name: 'Collar Mariposa ', price:8000, image: 'imagenes/Collar mariposas AB.jpg' },
            /*{ id: 67, name: 'Collar con Corazón Hueco', price:6000, image: 'imagenes/Collar con corazón hueco AB.jpg' },*/
            { id: 68, name: 'Collar y Dije Rectangular 60cm', price: 9500, image: 'imagenes/Collar y dije rectangular con cubic 60cm AB.jpg' },
            { id: 69, name: 'Cadena Rolo 50cm  ', price: 6500, image: 'imagenes/IMG_20241104_153002364.jpg' },
           /* { id: 70, name: 'Cadena ', price: 150, image: 'imagenes/IMG_20241017_170252121.jpg' },*/

        

           /* { id: 71, name: 'Cadena Rolo 4mm 50cm', price: 150, image: 'imagenes/Cadena rolo 4mm 50cm AB (1).jpg' },*/
            { id: 72, name: 'Cadena Rolo Espiga 50cm', price: 9000, image: 'imagenes/Cadena espiga 50cm AB.jpg' },
           /* { id: 73, name: 'Cadena Rolo Cuadrado 50cm', price: 150, image: 'imagenes/Cadena rolo cuadrado 50cm AB.jpg' },*/
            /*{ id: 74, name: 'Cadena Palomita 50cm ', price:7000, image: 'imagenes/Cadena palomita 50cm AB.jpg' },*/
            { id: 75, name: 'Cadena Madrid 50cm', price:8500, image: 'imagenes/Cadena Madrid 50cm AB.jpg' },
            { id: 76, name: 'Cadena Salomónica 60cm', price:9500, image: 'imagenes/Cadena Salomónica 60cm AB.jpg' },


           /* { id: 77, name: 'Collar Singapur 4mm 50cm', price: 150, image: 'imagenes/Cadena Singapur 50cm AB.jpg' },*/
            /*{ id: 78, name: 'Collar con Dije de Cruz', price:7500, image: 'imagenes/Collar con dije de cruz AB.jpg' },*/
            { id: 79, name: 'Cadena Palomita con Bolitias 50cm', price:8000, image: 'imagenes/IMG_20241104_155905534.jpg' }, 


            { id: 80, name: 'Dije Corazón', price:7000, image: 'imagenes/Dije corazón AB.jpg' },
            { id: 81, name: 'Dije Copo de Nieve Tornasolado', price:6000, image: 'imagenes/Dije copo de nieve tornasolado AB.jpg' },
            { id: 82, name: 'Dije Círculo', price:6000, image: 'imagenes/Dije círculo AB.jpg' },
            { id: 83, name: 'Dije árbol de la vida', price:8000, image: 'imagenes/Dije árbol de la vida AB.jpg' },
            { id: 84, name: 'Dije Caracol de Mar Tornasolado', price:6000, image: 'imagenes/Dije caracol de mar tornasolado AB.jpg' },
            { id: 85, name: 'Dije Ala ', price:6000, image: 'imagenes/Dije ala AB.jpg' },


            { id: 86, name: 'Dije Corazón Azul ', price: 6500, image: 'imagenes/Dije corazón azul AB.jpg' },
            /*{ id: 87, name: 'Dije Corazón', price: 150, image: 'imagenes/Dije corazón AB (1).jpg' },*/
            { id: 88, name: 'Dije Corazón Naranja', price:7000, image: 'imagenes/Dije corazón naranja AB.jpg' },
           /* { id: 89, name: 'Dije de Corazones con Piedra Turquesa y Cubic', price: 150, image: 'imagenes/Dije de corazones con piedra turquesa y cubic AB.jpg' },*/
            { id: 90, name: 'Dije Corazón Rosa y Verde ', price: 6500, image: 'imagenes/Dije corazón rosa y verde AB.jpg' },
            { id: 91, name: 'Dije Cruz de Equilibrio Tornasolado', price:6000, image: 'imagenes/Dije cruz de equilibrio tornasolado AB .jpg' },


            { id: 92, name: 'Dije de Flor ', price: 8000, image: 'imagenes/Dije de flor AB.jpg' },
            { id: 93, name: 'Dije de Cruz', price:7000, image: 'imagenes/Dije de cruz AB.jpg' },
            { id: 94, name: 'Dije flor con Corazón ', price: 8000, image: 'imagenes/Dije flor con corazón AB.jpg' },
            { id: 95, name: 'Dije estrella con Piedra Azul ', price:6000, image: 'imagenes/Dije estrella con piedra azul AB.jpg' },
            { id: 96, name: 'Dije Estrella de Mar Celeste', price:6000, image: 'imagenes/Dije estrella de mar celeste .jpg' },
            { id: 97, name: 'Dije Mano de Fátima', price:8000, image: 'imagenes/Dije mano de Fátima AB.jpg' },

            { id: 98, name: 'Dije Corazón Violeta y Verde ', price:7000, image: 'imagenes/IMG_20241104_153815692.jpg' },
            { id: 99, name: 'Dije Olas con Piedra Roja', price:8000, image: 'imagenes/Dije olas con piedra roja AB (1).jpg' },
            { id: 100, name: 'Dije San Benito', price:7500, image: 'imagenes/Dije San Benito AB.jpg' },
            { id: 101, name: 'Dije Serpiente ', price:6000, image: 'imagenes/Dije serpiente AB.jpg' },
            
            { id: 102, name: 'Pulsera Brazalete ajustable Nan', price:15000, image: 'imagenes/Brazalete ajustable Nan AB.jpeg' },
            { id: 103, name: 'Pulsera Esclava doble tipo gotas ', price:14500, image: 'imagenes/Brazalete doble tipo gota AB.jpeg' },
            { id: 104, name: 'Esclava 3.0 x 63 mm ', price:4000, image: 'imagenes/Esclava 3.0 x 63 mm AB (1).jpg' },
            { id: 105, name: 'Esclava 8.0 x 63 mm ', price:8000, image: 'imagenes/Esclava 8.0 x 63 mm AB (1).jpg' },
            { id: 106, name: 'Pulsera Esclava enlazado', price:12500, image: 'imagenes/Brazalete enlazado AB.jpeg' },
            /*{ id: 107, name: 'Esclava 6.0 x 63-67mm ', price: 6000, image: 'imagenes/Esclava 6.0 x 63_67 (1).jpg' },*/
            /*{ id: 108, name: 'Pulsera Box Doble con Corazones y Bolitas ', price: 9000, image: 'imagenes/IMG_20241104_154446955.jpg' },*/

            { id: 109, name: 'Pulsera Esclava triple ', price:10500, image: 'imagenes/Esclava triple AB.jpeg' },
            /*{ id: 110, name: 'Pulsera Ajustable María ', price:0, image: 'imagenes/Pulsera ajustable AB.jpeg' },*/
            /*{ id: 111, name: 'Pulsera Astrid', price:6500, image: 'imagenes/Pulsera Astrid AB (1).jpg' },*/
            { id: 112, name: 'Pulsera Cola de Ratón', price:6500, image: 'imagenes/Pulsera cola de ratón AB.jpg' },
            { id: 113, name: 'Pulsera Ajustable con bolitas en las puntas ', price:15000, image: 'imagenes/Pulsera ajustable con bolitas en la punta AB.jpeg' },
            { id: 114, name: 'Pulsera con corazón negro', price:11500, image: 'imagenes/Pulsera corazones negro AB.jpeg' },
            { id: 115, name: 'Pulsera con Dije de Fuego', price:4500, image: 'imagenes/Pulsera con dije de fuego AB (1).jpg' },
            { id: 116, name: 'Pulsera doble con brillantes blancos', price:9000, image: 'imagenes/Pulsera doble brillante blancos AB.jpeg' },
            { id: 117, name: 'Pulsera Dina ', price:8000, image: 'imagenes/Pulsera Dina AB.jpg' },
            { id: 118, name: 'Pulsera cuadruple con brillantes tornasolados ', price:10500, image: 'imagenes/Pulseras brillantes colores cuadruples AB.jpeg ' },
            
            
            







        ],



    },



        
   
    {
        id: 'acero-dorado', // ID para Acero Dorado
        title: 'Acero Dorado',
        products: [

 
            { id: 123, name: 'Anillo Eslabón Grueso', price:8000, image: 'imagenes/Anillo eslabón grueso AD.jpg' },
        
            { id: 124, name: 'Anillo Flores ', price:8000, image: 'imagenes/Anillo flores AD.jpg' },

            { id: 125, name: 'Aros Colgantes', price:5500, image: 'imagenes/Aros colgantes AD.jpg' },
        
            { id: 126, name: 'Aros Mariposa ', price: 7000, image: 'imagenes/Aros mariposa AD.jpg' },
            { id: 127, name: 'Aros de Corazón ', price:8000, image: 'imagenes/Aros de corazón AD.jpg' },

            { id: 128, name: 'Cadena Rectangular 40cm', price:5500, image: 'imagenes/Cadena rectangular AD.jpg' },
        
            { id: 129, name: 'Collar con Dije de Corazón ', price:8000, image: 'imagenes/Collar con dije de corazón AD.jpg' },


            { id: 130, name: 'Esclava 0.4 x 65 mm ', price: 6500, image: 'imagenes/Esclava 0.4 x 65 mm AD.jpg' },
        
            { id: 131, name: 'Pulsera Cola de Topo ', price: 6000, image: 'imagenes/Pulsera cola de topo AD.jpg' },
            { id: 132, name: 'Pulsera Brazalete con mariposas ', price: 15000, image: 'imagenes/Brazalete con mariposas AD.jpeg' },
            { id: 133, name: 'Pulsera Brazalete Sara ', price: 15000, image: 'imagenes/Brazalete ajustable Sara AD.jpeg' },



        ],
    },
    {
        id: 'acero-rose', // ID para Acero Rose
        title: 'Acero Rose',
        products: [
            { id: 134, name: 'Argolla Tere', price: 3500, image: 'imagenes/Argolla Tere AR (2).jpg' },
          
        ],
    },
    
    {
        id: 'bolsos', // ID para Bolsos
        title: 'Proximamente vamos a ofrecer Bolsos',

        /*
        products: [
            
            { id: 10, name: 'Bolso de Cuero', price: 200, image: './imagenes/bolso1.jpg' },
            { id: 11, name: 'Bolso de Tela', price: 80, image: './imagenes/bolso2.jpg' },
             
        ],
        */
    },
    
];


// Agregar productos al contenedor
const productContainer = document.getElementById('productContainer');

// Función para mostrar todos los productos al cargar la página
function displayAllProducts() {
    productContainer.innerHTML = ''; // Limpiar el contenedor de productos

    // Recorrer todas las categorías y mostrar sus productos
    categories.forEach(category => {
        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('my-4');
        
        const categoryTitle = document.createElement('h2');
        categoryTitle.textContent = category.title;
        categoryTitle.classList.add('text-center');
        categoryContainer.appendChild(categoryTitle);
        
        const productWrapper = document.createElement('div');
        productWrapper.classList.add('d-flex', 'justify-content-center', 'flex-wrap');
        
        category.products.forEach(product => {
            const card = document.createElement('div');
            card.classList.add('card', 'm-2', 'text-center');
            card.style.width = '340px';
    
            card.innerHTML = `
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">$${product.price}</p>
                    <button class="btn btn-success" onclick="addToCart({ name: '${product.name}', price: ${product.price} })">Agregar al carrito</button>
                </div>
            `;
            productWrapper.appendChild(card);
        });
        
        categoryContainer.appendChild(productWrapper);
        productContainer.appendChild(categoryContainer);
    });
}

// Función para manejar el clic en el menú de categorías
function displayProducts(categoryId) {
    productContainer.innerHTML = ''; // Limpiar el contenedor de productos

    const category = categories.find(cat => cat.id === categoryId);
    if (category) {
        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('my-4');
        
        const categoryTitle = document.createElement('h2');
        categoryTitle.textContent = category.title;
        categoryTitle.classList.add('text-center');
        categoryContainer.appendChild(categoryTitle);
        
        const productWrapper = document.createElement('div');
        productWrapper.classList.add('d-flex', 'justify-content-center', 'flex-wrap');
        
        category.products.forEach(product => {
            const card = document.createElement('div');
            card.classList.add('card', 'm-2', 'text-center');
            card.style.width = '250px';
           

            card.innerHTML = `
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">$${product.price}</p>
                    <button class="btn btn-success" onclick="addToCart({ name: '${product.name}', price: ${product.price} })">Agregar al carrito</button>
                </div>
            `;
            productWrapper.appendChild(card);
        });
        
        categoryContainer.appendChild(productWrapper);
        productContainer.appendChild(categoryContainer);
    }
}

// Vincular el evento del menú desplegable
const dropdownItems = document.querySelectorAll('.dropdown-item');
dropdownItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const categoryId = e.target.getAttribute('data-id');
        displayProducts(categoryId); // Mostrar los productos de la categoría seleccionada
    });
});

// Mostrar todos los productos al cargar la página
displayAllProducts();

