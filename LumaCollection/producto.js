const params = new URLSearchParams(window.location.search);
const tipo = params.get("tipo");
const index = parseInt(params.get("index"));

fetch("productos.json")
  .then(res => res.json())
  .then(data => {
    const producto = data[tipo]?.[index];
    if (!producto) return;

    document.getElementById("productName").textContent = producto.name;
    document.getElementById("productPrice").textContent = producto.price;
    document.getElementById("productColor").textContent = producto.color || "";

    const desc = producto.description || "";
    document.getElementById("productDescription").textContent = desc;

    const mainImage = document.getElementById("mainImage");
    const thumbnailRow = document.getElementById("thumbnailRow");
    const sizesContainer = document.getElementById("productSizes");

    // Mostrar imagen principal
    mainImage.src = producto.images[0];

    // Miniaturas
    producto.images.forEach(src => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = producto.name;
      img.addEventListener("click", () => {
        mainImage.src = src;
      });
      thumbnailRow.appendChild(img);
    });

    // Tallas
    if (producto.sizes) {
      producto.sizes.forEach(size => {
        const span = document.createElement("span");
        span.textContent = size;
        sizesContainer.appendChild(span);
      });
    }
  })
  .catch(err => console.error("Error cargando producto:", err));
