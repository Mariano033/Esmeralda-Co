// buscador.js

function searchProducts(query) {
    const searchText = query.toLowerCase();
    const productContainer = document.getElementById('productContainer');
    productContainer.innerHTML = ''; // Limpiar el contenedor antes de mostrar los resultados

    let hasResults = false; // Variable para verificar si hay resultados

    categories.forEach(category => {
        const filteredProducts = category.products.filter(product =>
            product.name.toLowerCase().includes(searchText)
        );

        if (filteredProducts.length > 0) {
            hasResults = true; // Hay al menos un producto que coincide

            // Crear contenedor para la categoría filtrada
            const categoryContainer = document.createElement('div');
            categoryContainer.classList.add('my-4');

            const categoryTitle = document.createElement('h2');
            categoryTitle.textContent = category.title;
            categoryTitle.classList.add('text-center');
            categoryContainer.appendChild(categoryTitle);

            const productWrapper = document.createElement('div');
            productWrapper.classList.add('d-flex', 'justify-content-center', 'flex-wrap');

            filteredProducts.forEach(product => {
                const card = document.createElement('div');
                card.classList.add('card', 'm-2', 'text-center');
                card.style.width = '12rem';

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

            categoryContainer.appendChild(productWrapper);
            productContainer.appendChild(categoryContainer);
        }
    });

    // Si no hay resultados, mostrar un mensaje
    if (!hasResults) {
        const noResultsMessage = document.createElement('p');
        noResultsMessage.textContent = 'El producto no se encuentra disponible.';
        noResultsMessage.classList.add('text-center');
        productContainer.appendChild(noResultsMessage);
    }
}

// Event listener para el campo de búsqueda
document.getElementById('searchInput').addEventListener('input', function () {
    searchProducts(this.value);
});
