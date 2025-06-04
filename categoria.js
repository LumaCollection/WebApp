// ...código existente...
const params = new URLSearchParams(window.location.search);
const tipo = params.get("tipo");

fetch('productos.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('productContainer');
    const titulo = document.getElementById('tituloCategoria');

    // Si no hay tipo, mostramos todos los productos de todas las categorías
    // ...código existente...
if (!tipo) {
  titulo.textContent = "TODOS LOS PRODUCTOS";
  container.innerHTML = "";
  container.classList.remove("product-grid"); // Asegúrate de quitar el grid general

  Object.keys(data).forEach(categoria => {
    // Crear un bloque para cada categoría
    const bloque = document.createElement("div");
    bloque.className = "categoria-bloque";

    // Título de la categoría
    const catTitle = document.createElement("h2");
    catTitle.textContent = categoria.replace("-", " ").toUpperCase();
    catTitle.className = "categoria-titulo";
    bloque.appendChild(catTitle);

    // Grid de productos SOLO para esta categoría
    const grid = document.createElement("div");
    grid.className = "product-grid";
    data[categoria].forEach((producto, index) => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.setAttribute("data-index", index);
      card.setAttribute("data-tipo", categoria);

      const img1 = document.createElement("img");
      img1.src = producto.images[0];
      img1.alt = producto.name;
      card.appendChild(img1);

      if (producto.images[1]) {
        const img2 = document.createElement("img");
        img2.src = producto.images[1];
        img2.className = "secondary";
        img2.alt = producto.name;
        card.appendChild(img2);
      }

      const nameDiv = document.createElement("div");
      nameDiv.className = "product-name";
      nameDiv.textContent = producto.name;
      card.appendChild(nameDiv);

      const priceDiv = document.createElement("div");
      priceDiv.className = "product-price";
      priceDiv.textContent = producto.price;
      card.appendChild(priceDiv);

      card.addEventListener('click', () => {
        window.location.href = `producto.html?tipo=${categoria}&index=${index}`;
      });

      grid.appendChild(card);
    });

    bloque.appendChild(grid);
    container.appendChild(bloque);
  });
  return;
}
// ...código existente...

    // ...código existente para mostrar una sola categoría...
    const productos = data[tipo];
    if (!productos || productos.length === 0) {
      titulo.textContent = "Categoría no encontrada";
      container.innerHTML = "<p>No hay productos disponibles en esta categoría.</p>";
      return;
    }

    titulo.textContent = tipo.replace("-", " ").toUpperCase();

    productos.forEach((producto, index) => {
      const html = `
        <div class="product-card" data-index="${index}">
          <img src="${producto.images[0]}" alt="${producto.name}">
          ${producto.images[1] ? `<img src="${producto.images[1]}" class="secondary" alt="${producto.name}">` : ""}
          <div class="product-name">${producto.name}</div>
          <div class="product-price">${producto.price}</div>
        </div>
      `;
      container.innerHTML += html;
    });

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
// ...código existente...