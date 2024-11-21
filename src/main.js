const mealsData = [
  {
    image: {
      thumbnail: "./assets/images/image-waffle-thumbnail.jpg",
      mobile: "./assets/images/image-waffle-mobile.jpg",
      tablet: "./assets/images/image-waffle-tablet.jpg",
      desktop: "./assets/images/image-waffle-desktop.jpg",
    },
    name: "Waffle with Berries",
    category: "Waffle",
    price: 6.5,
  },
  {
    image: {
      thumbnail: "./assets/images/image-creme-brulee-thumbnail.jpg",
      mobile: "./assets/images/image-creme-brulee-mobile.jpg",
      tablet: "./assets/images/image-creme-brulee-tablet.jpg",
      desktop: "./assets/images/image-creme-brulee-desktop.jpg",
    },
    name: "Vanilla Bean Crème Brûlée",
    category: "Crème Brûlée",
    price: 7.0,
  },
  {
    image: {
      thumbnail: "./assets/images/image-macaron-thumbnail.jpg",
      mobile: "./assets/images/image-macaron-mobile.jpg",
      tablet: "./assets/images/image-macaron-tablet.jpg",
      desktop: "./assets/images/image-macaron-desktop.jpg",
    },
    name: "Macaron Mix of Five",
    category: "Macaron",
    price: 8.0,
  },
  {
    image: {
      thumbnail: "./assets/images/image-tiramisu-thumbnail.jpg",
      mobile: "./assets/images/image-tiramisu-mobile.jpg",
      tablet: "./assets/images/image-tiramisu-tablet.jpg",
      desktop: "./assets/images/image-tiramisu-desktop.jpg",
    },
    name: "Classic Tiramisu",
    category: "Tiramisu",
    price: 5.5,
  },
  {
    image: {
      thumbnail: "./assets/images/image-baklava-thumbnail.jpg",
      mobile: "./assets/images/image-baklava-mobile.jpg",
      tablet: "./assets/images/image-baklava-tablet.jpg",
      desktop: "./assets/images/image-baklava-desktop.jpg",
    },
    name: "Pistachio Baklava",
    category: "Baklava",
    price: 4.0,
  },
  {
    image: {
      thumbnail: "./assets/images/image-meringue-thumbnail.jpg",
      mobile: "./assets/images/image-meringue-mobile.jpg",
      tablet: "./assets/images/image-meringue-tablet.jpg",
      desktop: "./assets/images/image-meringue-desktop.jpg",
    },
    name: "Lemon Meringue Pie",
    category: "Pie",
    price: 5.0,
  },
  {
    image: {
      thumbnail: "./assets/images/image-cake-thumbnail.jpg",
      mobile: "./assets/images/image-cake-mobile.jpg",
      tablet: "./assets/images/image-cake-tablet.jpg",
      desktop: "./assets/images/image-cake-desktop.jpg",
    },
    name: "Red Velvet Cake",
    category: "Cake",
    price: 4.5,
  },
  {
    image: {
      thumbnail: "./assets/images/image-brownie-thumbnail.jpg",
      mobile: "./assets/images/image-brownie-mobile.jpg",
      tablet: "./assets/images/image-brownie-tablet.jpg",
      desktop: "./assets/images/image-brownie-desktop.jpg",
    },
    name: "Salted Caramel Brownie",
    category: "Brownie",
    price: 4.5,
  },
  {
    image: {
      thumbnail: "./assets/images/image-panna-cotta-thumbnail.jpg",
      mobile: "./assets/images/image-panna-cotta-mobile.jpg",
      tablet: "./assets/images/image-panna-cotta-tablet.jpg",
      desktop: "./assets/images/image-panna-cotta-desktop.jpg",
    },
    name: "Vanilla Panna Cotta",
    category: "Panna Cotta",
    price: 6.5,
  },
];


// Variables
const main = document.querySelector("#main");
const cartProducts = document.querySelector("#cart-products");
const cartCount = document.querySelector("#count_cart");
const modalBackdrop = document.querySelector('.modal-backdrop');

modalBackdrop.addEventListener('click', () => {
  modalBackdrop.style.display = "none";
})

function oponModal() {
  document.getElementById('modal').style.display = 'block'
  modalBackdrop.style.display = "flex";
  renderCart();
}

let cart = [];
function renderMeals() {
  main.innerHTML = mealsData
    .map((meal) => {
      const isInCart = cart.find((item) => item.name === meal.name);
      const quantity = isInCart ? isInCart.quantity : 0;

      return `
        <div class="card">
          <div class="img-container">
            <img src=".${meal.image.desktop}" alt="${meal.name}" />
            <button class="add-btn ${quantity > 0 ? "js-display" : ""}" 
              onclick='addToCart(${JSON.stringify(meal)})'>Add to cart</button>
            <div class="btn-group ${quantity > 0 ? "" : "js-display"}">
              <button class="btn-primary" onclick="handleIncreaseQuantity('${
                meal.name
              }')">+</button>
              <span id="quantity-${meal.name}">${quantity}</span>
              <button class="btn-primary" onclick="handleDecreaseQuantity('${
                meal.name
              }')">-</button>
            </div>
          </div>
          <h3>${meal.name}</h3>
          <p>$${meal.price.toFixed(2)}</p>
        </div>
      `;
    })
    .join("");
}

function addToCart(meal) {
  const existing = cart.find((item) => item.name === meal.name);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...meal, quantity: 1 });
  }
  renderMeals();
  renderCart();
}

function handleIncreaseQuantity(name) {
  const item = cart.find((meal) => meal.name === name);
  if (item) {
    item.quantity++;
  } else {
    const meal = mealsData.find((meal) => meal.name === name);
    cart.push({ ...meal, quantity: 1 });
  }
  renderMeals();
  renderCart();
}

function handleDecreaseQuantity(name) {
  const item = cart.find((meal) => meal.name === name);
  if (item) {
    item.quantity--;
    if (item.quantity === 0) {
      cart = cart.filter((meal) => meal.name !== name);
    }
  }
  renderMeals();
  renderCart();
}

function renderCart() {
  // Clear previous content
  cartProducts.innerHTML = "";

  // Render cart items
  cart.forEach((item) => {
    let wrapperList = document.createElement("div");
    wrapperList.classList.add("cart_item_wrapper");

    // Apply styles for hidden scrollbar but with scroll functionality
    wrapperList.style.overflow = "auto"; // Add overflow auto for scroll when necessary
    wrapperList.style.maxHeight = "300px"; // Set a max height (adjust as needed)
    wrapperList.style.marginBottom = "10px"; // Optional: for some spacing between items

    wrapperList.innerHTML = `
      <div class="your-products-li">
        <li class="cart_item">
          <div>
            <h3>${item.name}</h3>
            <div class="cart_item_info">
              <span class="quantity">x${item.quantity}</span>
              •
              <span class="total-price">$${(item.quantity * item.price).toFixed(
                2
              )}</span>
              •
              <span class="price">$${item.price.toFixed(2)}</span>
            </div>
          </div>
          <button class="remove_item" onclick='removeFromCart("${item.name}")'>
            <i class="fa-solid fa-xmark"></i>
          </button>
        </li>
      </div>
    `;

    cartProducts.appendChild(wrapperList);
  });

  // Calculate cart total quantity and price
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart
    .reduce((total, item) => total + item.quantity * item.price, 0)
    .toFixed(2);

  // Update cart count
  cartCount.textContent = totalQuantity;

  // Add order total and confirm button
  cartProducts.innerHTML += `
    <div class="cart_total">
      <div class="order-total">
        <p>Order Total</p>
        <h2>$${totalPrice}</h2>
      </div>

      <div class="carbon-div">
        <p>This is a carbon-neutral delivery</p>
      </div>

      <div>
        <button onclick="oponModal()" class="btn-confirm" ${
    totalQuantity === 0 ? "disabled" : ""
  }>Confirm Order</button>
      </div>
    </div>
  `;
}


function removeFromCart(name) {
  cart = cart.filter((item) => item.name !== name);
  renderMeals();
  renderCart();
}

// Initial render
renderMeals();
