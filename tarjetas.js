const names = [
  "Anillo de Plata", "Collar de Oro", "Pulsera de Cuero", "Anillo Full", "Anillos", "Anillo de Fuego","anillo de plata" /* ...más nombres aquí */
];
const prices = [
  5000, 7500, 3200, 8000, 9000, 10000, 8005 /* ...más precios aquí */
];
const images = [
  "imagenes/anillo1plata.jpg", "imagenes/anillo2plata.jpg", "imagenes/anillo3plata.jpg", /* ...más imágenes aquí */
];

// El contenedor donde se colocarán las tarjetas
const productContainer = document.getElementById("productContainer");

// Variable para almacenar el HTML de los artículos
let contentHtml = "";

// Función para crear las tarjetas de productos
function createProductCards(filter = "") {
  contentHtml = ""; // Reiniciar el contenido HTML

  // Agregar título dinámico
  

  let found = false; // Variable para saber si se encontraron artículos

  contentHtml += `<h2 class="text-center">Joyas de Plata 925</h2>`;
  for (let i = 0; i < names.length; i++) {
    
      if (names[i].toLowerCase().includes(filter.toLowerCase())) {
          contentHtml += `
              <div class="card tar product" data-name="${names[i]}">
                  <img src="${images[i % images.length]}" class="card-img-top joya" alt="${names[i]}">
                  <div class="card-body tra2">
                      <p class="card-text text-center">${names[i]}</p>
                      <p class="card-text text-center">$${prices[i]}</p>
                  </div>
              </div>
          `;
          found = true; // Se encontraron artículos
          
      }
  }



  contentHtml += `<h2 class="text-center">Acero Blanco</h2>`;
  for (let i = 0; i < names.length; i++) {
    if (names[i].toLowerCase().includes(filter.toLowerCase())) {
        contentHtml += `
            <div class="card tar product" data-name="${names[i]}">
                <img src="${images[i % images.length]}" class="card-img-top joya" alt="${names[i]}">
                <div class="card-body tra2">
                    <p class="card-text text-center">${names[i]}</p>
                    <p class="card-text text-center">$${prices[i]}</p>
                </div>
            </div>
        `;
        found = true; // Se encontraron artículos
    }
}


contentHtml += `<h2 class="text-center">Acero Dorado</h2>`;
  for (let i = 0; i < names.length; i++) {
    if (names[i].toLowerCase().includes(filter.toLowerCase())) {
        contentHtml += `
            <div class="card tar product" data-name="${names[i]}">
                <img src="${images[i % images.length]}" class="card-img-top joya" alt="${names[i]}">
                <div class="card-body tra2">
                    <p class="card-text text-center">${names[i]}</p>
                    <p class="card-text text-center">$${prices[i]}</p>
                </div>
            </div>
        `;
        found = true; // Se encontraron artículos
    }
}


contentHtml += `<h2 class="text-center">Acero Rose</h2>`;
  for (let i = 0; i < names.length; i++) {
    if (names[i].toLowerCase().includes(filter.toLowerCase())) {
        contentHtml += `
            <div class="card tar product" data-name="${names[i]}">
                <img src="${images[i % images.length]}" class="card-img-top joya" alt="${names[i]}">
                <div class="card-body tra2">
                    <p class="card-text text-center">${names[i]}</p>
                    <p class="card-text text-center">$${prices[i]}</p>
                </div>
            </div>
        `;
        found = true; // Se encontraron artículos
    }
}


contentHtml += `<h2 class="text-center">Bolsos</h2>`;
  for (let i = 0; i < names.length; i++) {
    if (names[i].toLowerCase().includes(filter.toLowerCase())) {
        contentHtml += `
            <div class="card tar product" data-name="${names[i]}">
                <img src="${images[i % images.length]}" class="card-img-top joya" alt="${names[i]}">
                <div class="card-body tra2">
                    <p class="card-text text-center">${names[i]}</p>
                    <p class="card-text text-center">$${prices[i]}</p>
                </div>
            </div>
        `;
        found = true; // Se encontraron artículos
    }
}



  // Si no se encuentran artículos, mostrar un mensaje
  if (!found) {
      contentHtml += `<p class="text-center aviso" style="color: red;">El producto no se encuentra disponible.</p>`;
  }

  // Insertar todo el contenido en el contenedor de una vez
  productContainer.innerHTML = contentHtml;
}

// Inicializar las tarjetas al cargar la página
createProductCards();

// Agregar evento al campo de búsqueda
document.getElementById("searchInput").addEventListener("input", function() {
  createProductCards(this.value);
});
