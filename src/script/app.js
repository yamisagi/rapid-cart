import { productsModel } from './products-model.js';

const productList = document.getElementById('product-list');
const cart = document.querySelector('#cart');

const products = productsModel.getAllProducts();

const cartList = [];
renderProducts();
// Event Listeners
document.addEventListener('DOMContentLoaded', renderCart);

// Functions
function renderProducts() {
  for (let product of products) {
    const productElement = document.createElement('div');
    productElement.classList.add(
      'bg-gray-800',
      'rounded-lg',
      'p-6',
      'flex',
      'flex-col',
      'items-center',
      `${product.id}`
    );
    productElement.innerHTML = `
      <img
        src="${product.productImg}"
        alt="${product.name}"
        class="w-64 mb-4 rounded"
      />
      <h2 class="text-lg font-semibold mb-2">${product.name}</h2>
      <div class="flex space-x-3 mb-4">
        <p class="text-gray-400">${product.price} $</p>
        <p class="text-gray-500 line-through">${product.price + 100} $</p>
      </div>
      <div class="flex space-x-2 mb-4">
        <button class="quantity-btn" id="decrease-btn">
          <i class="fas fa-minus text-red-500"></i>
        </button>
        <p class="quantity">1</p>
        <button class="quantity-btn text-red-500">
          <i class="fas fa-plus"></i>
        </button>
      </div>
      <button
        class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        id="add-to-cart-btn"
      >
        Sepete Ekle
      </button>
    `;
    productList.appendChild(productElement);

    const addToCartButton = productElement.querySelector('#add-to-cart-btn');
    addToCartButton.addEventListener('click', () => {
      const quantity = parseInt(productElement.querySelector('.quantity').textContent);
      for (let i = 0; i < quantity; i++) {
        addToCart(product.id);
      }
      renderCart();
    });

    const decreaseButton = productElement.querySelector('#decrease-btn');
    decreaseButton.addEventListener('click', () => {
      const quantityElement = productElement.querySelector('.quantity');
      let quantity = parseInt(quantityElement.textContent);
      if (quantity > 1) {
        quantity--;
        quantityElement.textContent = quantity;
      }
    });

    const increaseButton = productElement.querySelector('.quantity-btn.text-red-500');
    increaseButton.addEventListener('click', () => {
      const quantityElement = productElement.querySelector('.quantity');
      let quantity = parseInt(quantityElement.textContent);
      quantity++;
      quantityElement.textContent = quantity;
    });
  }
}

function renderCart() {
  cart.innerHTML = '';
  let totalQuantity = 0;
  let totalPrice = 0;

  for (let item of cartList) {
    const quantityText = item.quantity > 1 ? `x${item.quantity}` : '';
    const listItem = document.createElement('li');
    listItem.classList.add('flex', 'items-center', 'justify-between', 'mb-4');
    listItem.innerHTML = `
      <div class="flex items-center">
        <img
          src="${item.productImg}"
          alt="${item.name}"
          class="w-10 h-10 rounded-full mr-4"
        />
        <div>
          <h3 class="text-lg font-semibold mb-2">${item.name} ${quantityText}</h3>
          <p class="text-gray-400">${item.price} $</p>
        </div>
      </div>
      <button
        class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
      >
        Sil
      </button>
    `;
    cart.appendChild(listItem);

    totalQuantity += item.quantity;
    totalPrice += item.price * item.quantity;
  }

  const taxPercentage = 18;
  const taxAmount = totalPrice * (taxPercentage / 100);

  // Update cart total
  const totalProductsElement = document.querySelector('.text-gray-400.products-quantity');
  const totalPriceElement = document.querySelector('.text-white.total-price');
  const taxTextElement = document.querySelector('.text-white.tax-text');
  const totalElement = document.querySelector('.text-white.total');


  totalProductsElement.textContent = `Ürünler (${totalQuantity})`;
  totalPriceElement.textContent = `${totalPrice - taxAmount} $`;
  taxTextElement.textContent = `${taxAmount} $`;
  totalElement.textContent = `${totalPrice} $`;

}




function addToCart(id) {
  const product = productsModel.getProductById(parseInt(id));
  const index = cartList.findIndex(item => item.id === product.id);

  if (index === -1) {
    cartList.push({ ...product });
  } else {
    cartList[index].quantity++;
  }
}


