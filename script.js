// Dados fictícios de produtos
const products = [
  {
    id: 1,
    name: 'Headphone Blue',
    price: 99.99,
    image: 'img/main1.png'
  },
  {
    id: 2,
    name: 'Headphone White',
    price: 89.99,
    image: 'img/main2.png'
  },
  {
    id: 3,
    name: 'Headphone Black',
    price: 120.99,
    image: 'img/main3.png'
  }
];

// Elementos DOM
const productList = document.getElementById('product-list');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');
const clearCartBtn = document.getElementById('clear-cart');

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// view products
function renderProducts() {
  productList.innerHTML = '';
  products.forEach(product => {
    const div = document.createElement('div');
    div.classList.add('product');
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>£${product.price.toFixed(2)}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productList.appendChild(div);
  });
}

// add to cart
function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCart();
}


// update cart
function updateCart() {
  cartItems.innerHTML = '';
  let total = 0;
  let itemCount = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    itemCount += item.quantity;

    const li = document.createElement('li');
    li.innerHTML = `
      ${item.name} x${item.quantity} - £${itemTotal.toFixed(2)}
      <button onclick="removeItem(${item.id})">X</button>
    `;
    cartItems.appendChild(li);
  });

  cartTotal.textContent = total.toFixed(2);
  cartCount.textContent = itemCount;

  localStorage.setItem('cart', JSON.stringify(cart));
}

// remove item from cart
function removeItem(id) {
  const item = cart.find(p => p.id === id);

  if (item.quantity > 1) {
    item.quantity -= 1;
  } else {
    cart = cart.filter(p => p.id !== id);
  }

  updateCart();
}


// clear cart
clearCartBtn.onclick = () => {
  cart = [];
  updateCart();
};

renderProducts();
updateCart();

const checkoutBtn = document.getElementById('checkout-cart');

checkoutBtn.onclick = () => {
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

   localStorage.setItem("cart", JSON.stringify(cart));
  window.location.href = "checkout.html";
};
