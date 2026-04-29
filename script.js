// ==========================
// DADOS DOS PRODUTOS
// ==========================
const products = [
  { id: 1, name: "Boné", price: 18, img: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad" },
  { id: 2, name: "Perfume", price: 51, img: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519" },
  { id: 3, name: "Vaso", price: 25, img: "https://images.unsplash.com/photo-1524758631624-e2822e304c36" },
  { id: 4, name: "Skincare", price: 10, img: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10" }
];

// ==========================
// ESTADO
// ==========================
let cart = [];
let favorites = [];

// ==========================
// ELEMENTOS
// ==========================
const container = document.getElementById("products");
const cartCount = document.getElementById("cartCount");
const favCount = document.getElementById("favCount");

// ==========================
// RENDER
// ==========================
function render(list) {
  container.innerHTML = "";

  list.forEach(p => {
    const div = document.createElement("div");
    div.classList.add("card");

    div.innerHTML = `
      <img src="${p.img}">
      <h3>${p.name}</h3>
      <p>R$ ${p.price}</p>
      <button onclick="addToCart(${p.id})">Comprar</button>
      <button onclick="addFav(${p.id})">❤️ Favoritar</button>
    `;

    container.appendChild(div);
  });
}

// ==========================
// CARRINHO
// ==========================
function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  updateCart();
}

function updateCart() {
  cartCount.textContent = cart.length;
}

// ==========================
// FAVORITOS
// ==========================
function addFav(id) {
  if (!favorites.includes(id)) {
    favorites.push(id);
    favCount.textContent = favorites.length;
  }
}

// ==========================
// BUSCA
// ==========================
document.getElementById("search").addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(value)
  );

  render(filtered);
});

// ==========================
// MODAL CARRINHO
// ==========================
const modal = document.getElementById("cartModal");
const cartList = document.getElementById("cartList");
const totalEl = document.getElementById("total");

document.querySelector(".icons").addEventListener("click", () => {
  modal.style.display = "block";
  renderCart();
});

function closeCart() {
  modal.style.display = "none";
}

function renderCart() {
  cartList.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price;
    const li = document.createElement("li");
    li.textContent = `${item.name} - R$ ${item.price}`;
    cartList.appendChild(li);
  });

  totalEl.textContent = `Total: R$ ${total}`;
}

// ==========================
// INIT
// ==========================
render(products);
