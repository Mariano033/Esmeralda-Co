const names = [
    "Anillo de Plata", "Collar de Oro", "Pulsera de Cuero", "anillo full", "anillos","anillo de fuego," /* ...más nombres aquí */
  ];
  const prices = [
    5000, 7500, 3200,8000, 9000 , 10000 , /* ...más precios aquí */
  ];
  const images = [
    "imagenes/anillo1plata.jpg", "imagenes/anillo2plata.jpg", "imagenes/anillo3plata.jpg", /* ...más imágenes aquí */
  ];
  
  // El contenedor donde se colocarán las tarjetas
  const productContainer = document.getElementById("productContainer");
  
  // Variable para almacenar el HTML de los artículos
  let contentHtml = "";
  
  // Agregar título y primeras 10 tarjetas para artículos de plata
  contentHtml += `<h2 class="text-center">Artículos de Plata</h2>`;
  
  for (let i = 0; i < 20; i++) {
      contentHtml += `
     
          <div class="card tar product " data-name="${name[i % name.length]}">
              <img src="${images[i % images.length]}" class="card-img-top joya" alt="${names[i % names.length]}">
              <div class="card-body tra2">
                  <p class="card-text text-center">${names[i % names.length]}</p>
                  <p class="card-text text-center">$${prices[i % prices.length]}</p>
              </div>
          </div>
     
      `;
  }

  
  
  // Agregar título y siguientes 30 tarjetas para artículos de acero dorado

 
  
  // Insertar todo el contenido en el contenedor de una vez
  productContainer.innerHTML = contentHtml;



  