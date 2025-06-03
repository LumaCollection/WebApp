// Obtener parámetro de categoría desde la URL
const params = new URLSearchParams(window.location.search);
const tipo = params.get("tipo");

fetch('productos.json')
  .then(res => res.json())
  .then(data => {
    const productos = data[tipo];
    const container = document.getElementById('productContainer');
    const titulo = document.getElementById('tituloCategoria');

    if (!productos || productos.length === 0) {
      titulo.textContent = "Categoría no encontrada";
      container.innerHTML = "<p>No hay productos disponibles en esta categoría.</p>";
      return;
    }

    // Mostrar el título de la categoría (limpio)
    titulo.textContent = tipo.replace("-", " ").toUpperCase();

    // Mostrar cada producto
    productos.forEach((producto, index) => {
      const html = `
        <div class="product-card" data-index="${index}">
          <img src="${producto.images[0]}" alt="${producto.name}">
          <img src="${producto.images[1]}" class="secondary" alt="${producto.name}">
          <div class="product-name">${producto.name}</div>
          <div class="product-price">${producto.price}</div>
        </div>
      `;
      // quitar la segunda imagen si no quiero que salga
      container.innerHTML += html;
    });

    // Si quieres hacer algo al hacer clic en cada producto, lo puedes hacer así:
    // (ej: abrir modal o redirigir a producto.html?tipo=X&index=Y)
    document.querySelectorAll('.product-card').forEach(card => {
      card.addEventListener('click', () => {
        const i = card.getAttribute('data-index');
        window.location.href = `producto.html?tipo=${tipo}&index=${i}`;
      });
    });

  })
  .catch(error => {
    console.error("Error cargando los productos:", error);
  });
