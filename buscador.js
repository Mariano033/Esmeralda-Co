document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const productContainer = document.getElementById("productContainer");
  
    // Observador de mutaciones para detectar cuando se agregan productos
    const observer = new MutationObserver(() => {
      const items = productContainer.querySelectorAll(".product-item");
  
      // Asegurarnos de que hay productos para filtrar
      if (items.length > 0) {
        // Desconectar el observador una vez que los productos estén cargados
        observer.disconnect();
  
        // Agregar el evento de filtrado
        searchInput.addEventListener("keyup", () => {
          const filter = searchInput.value.toLowerCase();
  
          items.forEach((item) => {
            const text = item.textContent.toLowerCase();
            if (text.includes(filter)) {
              item.style.display = ""; // Muestra el elemento
            } else {
              item.style.display = "none"; // Oculta el elemento
            }
          });
        });
      }
    });
  
    // Configuración del observador para detectar cambios en el DOM del productContainer
    observer.observe(productContainer, { childList: true, subtree: true });
  });