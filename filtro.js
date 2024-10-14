document.getElementById('filter-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Evita que el formulario se envíe

    const selectedPriceRange = document.querySelector('input[name="price"]:checked')?.value;
    const products = document.querySelectorAll('.product');

    products.forEach(product => {
        const productPrice = parseInt(product.getAttribute('data-price'));

        let priceMatch = false;
        if (selectedPriceRange) {
            const [minPrice, maxPrice] = selectedPriceRange.split('-').map(Number);
            priceMatch = productPrice >= minPrice && productPrice <= maxPrice;
        }

        if (priceMatch) {
            product.style.display = 'block'; // Muestra el producto si coincide con el filtro
        } else {
            product.style.display = 'none'; // Oculta el producto si no coincide
        }
    });
});
