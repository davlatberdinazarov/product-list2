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

const main = document.querySelector("#main");

function renderData() {
  if (mealsData.length == 0) {
    main.innerHTML = `
            <h1>There is no data...</h1>
        `;
  }

  mealsData.map((item) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
             <div class="img-container">
              <img src=".${item.image.desktop}" alt="img1">
              <button id="add-btn" class="add-btn" onclick="handleAddToCart(${JSON.stringify(item).replace(/"/g, '&quot;')})"><i class="fa-solid fa-cart-shopping"></i> Add to cart</button>
              
              <div class="js-display btn-group">
                <button class="btn-primary" onclick="handleIncreaseQuantity(${JSON.stringify(item).replace(/"/g, '&quot;')})">+</button>
                <span id="quantity">${item.quantity}</span>
                <button class="btn-primary" onclick="handleDecreaseQuantity(${JSON.stringify(item).replace(/"/g, '&quot;')})">-</button>
              </div>
            </div>
          
            <div class="card_content">
              <h5>${item.category}</h5>
              <h2>${item.name}</h2>
              <p>$${item.price}</p>
            </div>
        `;

    main.appendChild(card);
  });
}

renderData();

let cart = JSON.parse(localStorage.getItem("cart")) || []; // LocalStorage'dan massivni o'qiymiz yoki bo'sh massivni olamiz
let totalPrice = 0; // Umumiy narxni hisoblash uchun

function handleAddToCart(meals) {
  // Tekshirish: Mahsulot allaqachon savatda bormi?
  const existingItem = cart.find((item) => item.name === meals.name);
  if (!existingItem) {
    cart.push({ ...meals, quantity: 1 }); // Mahsulotni qo'shamiz
    localStorage.setItem("cart", JSON.stringify(cart)); // LocalStorage yangilanadi

    // Kartochka elementini topish
    const card = [...document.querySelectorAll(".card")].find(
      (c) => c.innerHTML.includes(meals.name)
    );

    const addBtn = card.querySelector(".add-btn");
    const btnGroup = card.querySelector(".btn-group");

    // Tugmalarni boshqarish
    addBtn.classList.add("js-display"); // Add to cart tugmasini yashirish
    btnGroup.classList.remove("js-display"); // Tugma guruhini ko'rsatish

    totalPrice += meals.price; // Umumiy narxni yangilash
    console.log("Savat: ", cart);
    console.log("Umumiy narx: ", totalPrice);
  } else {
    alert("Bu mahsulot allaqachon savatda mavjud!");
  }
}

function renderCarts() {
  const cartProducts = document.querySelector("#cart-products");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    cartProducts.innerHTML = `<h2>Savat bo'sh</h2>`;
    return;
  }

  cartProducts.innerHTML = ""; // Avvalgi ma'lumotlarni o'chiramiz

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.classList.add("product_item");
    li.innerHTML = `
      <h3>${item.name}</h3>
      <div class="cart_item">
        <div class="cart_item_info">
          <span class="quantity">${item.quantity}x</span>
          <span class="total-price">$${(item.quantity * item.price).toFixed(2)}</span>
          <span class="price">$${item.price.toFixed(2)}</span>
        </div>
        <div>
          <button class="remove_item" onclick="handleRemoveFromCart('${item.name}')">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
    `;
    cartProducts.appendChild(li);
  });
}

function handleRemoveFromCart(productName) {
  // Mahsulotni cart massivdan olib tashlaymiz
  cart = cart.filter((item) => item.name !== productName);
  localStorage.setItem("cart", JSON.stringify(cart)); // LocalStorage yangilanadi
  renderCarts(); // Savatni qaytadan chizamiz
}

// Sahifani yangilashda savatni qayta ko'rsatish uchun
renderCarts();
