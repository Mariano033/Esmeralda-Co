document.getElementById('searchForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Evita que la página se recargue
  
    const searchTerm = document.getElementById('searchInput').value.toLowerCase(); // Obtiene el valor del campo de búsqueda
    const products = document.querySelectorAll('.card.product'); // Selecciona todas las tarjetas de productos
  
    products.forEach(function(product) {
      const productType = product.getAttribute('data-type').toLowerCase(); // Obtiene el tipo de producto (data-type)
  
      if (productType.includes(searchTerm)) {
        product.style.display = ''; // Muestra el producto si coincide
      } else {
        product.style.display = 'none'; // Oculta el producto si no coincide
      }
    });
  
    // Revisar las secciones y ocultar los títulos h2 si no hay productos visibles
    document.querySelectorAll('section').forEach(function(section) {
      const visibleProducts = section.querySelectorAll('.card.product:not([style*="display: none"])');
      const sectionTitle = section.querySelector('h2');
  
      if (visibleProducts.length === 0) {
        sectionTitle.style.display = 'none'; // Oculta el h2 si no hay productos visibles
      } else {
        sectionTitle.style.display = ''; // Muestra el h2 si hay productos visibles
      }
    });
  });