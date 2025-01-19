const socket = io();

const productList = document.getElementById("products");
const form = document.getElementById("form");

/*form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const price = document.getElementById("price").value;
    const stock = document.getElementById("stock").value;
    const description = document.getElementById("description").value;
    const category = document.getElementById("category").value;
    const thumbnail = document.getElementById("thumbnail").value;

    if (!title || !price || !stock || !description || !category || !thumbnail) {
        return alert("Todos los campos son obligatorios");
    }

    const data = {
        title,
        price,
        stock,
        description,
        category,
        thumbnail
    };

    socket.emit("nuevoProducto", data);
});*/

socket.on("init", (products) => {
    products.forEach((product) => {
        const li = createProduct(product);
        productList.appendChild(li);
    });
});

socket.on("nuevoProducto", (product) => {
    const li = createProduct(product);
    productList.appendChild(li);
});

function createProduct(product) {
    const li = document.createElement("li");
    li.innerHTML = `
        <strong>${product.title}:</strong> ${product.price}
    `;
    li.className = "collection-item";
    return li;
}
