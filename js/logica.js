console.table(products);
let cart = [];
let productContainer = document.getElementById('products');
let cartItems = document.getElementById("cartItems");
const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton: 'btn btn-warning m-1',
        cancelButton: 'btn btn-success m-1'
    },
    buttonsStyling: false
})


// DOM
function productRendering(productList) {
    //We empty the container to avoid dupplicates
    productContainer.innerHTML += "";
    //Loading cards of requested products
    for (const product of productList) {
        productContainer.innerHTML += `
        <div class="card" style="width: 19rem;">
            <img class="card-img-top" src=${product.photo} alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">Precio $ ${product.price}.00</p>
                <button id=${product.id} class="btn btn-warning buy"><i class="fa-solid fa-cart-shopping"></i> Add to cart</button>
            </div>
        </div>
        `;
    }
    // Events
    let buttons = document.getElementsByClassName("buy");
    for (const button of buttons) {
        //Option 1 - addEventListener
        button.addEventListener('click', () => {
            console.log('there is a click on the button id: ' + button.id);
            const itemToCart = products.find((product) => product.id == button.id)
            console.log(itemToCart);
            addToCart(itemToCart);
            Toastify({
                text: `${itemToCart.name} has been added to the cart`,
                duration: 2000,
                className: "tst",
                style: {
                    background: "#ffc107",
                },
                gravity: 'top',
                position: 'right'
            }).showToast()
        })
        //Option 2 (hover)
        button.onmouseover = () => button.classList.replace('btn-warning', 'btn-success');
        button.onmouseout = () => button.classList.replace('btn-success', 'btn-warning');
    }
}

productRendering(products);


// Add item to the cart
function addToCart(product) {
    cart.push(product);
    console.table(cart);
    cartItems.innerHTML += `
    <tr>
        <td>${product.id}</td>
        <td><img src="${product.photo}" alt="${product.name}" class="cart-size"></td>
        <td>${product.name}</td>
        <td>$ ${product.price}.00</td>
    </tr>
    `;
    // Calculate and update total price
    updateTotalPrice();
    // Update "Proceed to Payment" button text
    updatePaymentButton();
    // Save updated cart to localStorage
    saveCartToLocalStorage();
    // Update cart table with the new item
    updateCartTable();
}

// Calculate total price of items in the cart
function calculateTotalPrice() {
    let totalPrice = 0;
    for (const item of cart) {
        totalPrice += item.price;
    }
    return totalPrice;
}

// Update total price in the cart table
function updateTotalPrice() {
    const totalPrice = calculateTotalPrice();
    cartTotal.innerHTML = `$${totalPrice.toFixed(2)}`;
}

// Calculate total count of items in the cart
function calculateTotalItemCount() {
    return cart.length;
}

// Update the text of the button
function updatePaymentButton() {
    const totalItemCount = calculateTotalItemCount();
    const btnPayment = document.getElementById('btnPayment');
    btnPayment.textContent = `Proceed to payment (${totalItemCount})`;
}

// Update the cart table with the items from the cart
function updateCartTable() {
    cartItems.innerHTML = '';
    cart.forEach((product) => {
        cartItems.innerHTML += `
            <tr>
                <td>${product.id}</td>
                <td><img src="${product.photo}" alt="${product.name}" class="cart-size"></td>
                <td>${product.name}</td>
                <td>$ ${product.price}.00</td>
            </tr>
        `;
    });
    // Calculate and update total price
    updateTotalPrice();
}

// Clear the whole cart
function clearCart() {
    cart = [];
    // Save the updated cart to localStorage
    saveCartToLocalStorage();
    // Update the cart table with the new items (empty cart)
    updateCartTable();
    // Update "Proceed to Payment" button text
    updatePaymentButton();
}


// Events Newsletter
let emailNewsletter = document.getElementById('email');

emailNewsletter.onkeyup = () => {
    if (emailNewsletter.value.length < 13 || ((!emailNewsletter.value.includes('@') || !emailNewsletter.value.includes('.')))) {
        console.log('invalid email')
        emailNewsletter.style.color = '#bb0f0f';
        document.getElementById('emailHelp').innerText = "Please enter a valid e-mail adress.";
    } else {
        emailNewsletter.style.color = 'black';
        document.getElementById('emailHelp').innerText = "Cool email! :)";
    }
}
// Event onChange for Newsletter
emailNewsletter.onchange = () => {
    document.getElementById('emailHelp').innerText = "We'll never share your email with anyone else.";
}
// Event listener for Newsletter
let formNewsletter = document.getElementById('formNewsletter');
formNewsletter.addEventListener('submit', validate);
//Validate emai before sending
function validate(ev) {
    if (emailNewsletter.value == '') {
        ev.preventDefault();
        alert('Enter a valid email')
    }
}

// Event listener for the "Clear Cart" button
const btnClearCart = document.getElementById('btnClearCart');
btnClearCart.addEventListener('click', () => {
    clearCart()
    swalWithBootstrapButtons.fire({
        title: 'Are you sure you want to empty your cart?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, empty it!'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Fresh new cart!',
                'Your cart has been emptied.',
                'success'
            )
        }
    })
});


// Save the cart items to localStorage
function saveCartToLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(cart));
}

// Get the cart items from localStorage
function getCartFromLocalStorage() {
    const storedCart = localStorage.getItem('cartItems');
    return storedCart ? JSON.parse(storedCart) : [];
}

// Update the cart from localStorage
function updateCartFromLocalStorage() {
    cart = getCartFromLocalStorage();
    // Update the cart table with the items retrieved from localStorage
    updateCartTable();
    // Update the "Proceed to Payment" button with the total item count
    updatePaymentButton();
}

// Recovering cart from localStorage when the page loads
document.addEventListener('DOMContentLoaded', () => {
    updateCartFromLocalStorage();
});



// Dark & light mode button
const modeButton = document.getElementById('modeButton');
const container = document.getElementById('mainBody');

console.log('Mode is set to ' + localStorage.getItem('modeButton'));

// Get the mode from localStorage or set 'light' as default if it's not set
const currentMode = localStorage.getItem('modeButton') || 'light';

// Conditional
if (currentMode === 'dark') {
    // If it is set to dark
    document.body.className = 'dark';
    container.classList.replace('light', 'dark');
    modeButton.innerText = 'Light Mode';
} else {
    // If it is set to light
    localStorage.setItem('modeButton', 'light');
}

// Button mode event
modeButton.onclick = () => {
    if (localStorage.getItem('modeButton') === 'light') {
        toDark();
    } else {
        toLight();
    }
}

// Dark mode settings
function toDark() {
    document.body.className = 'dark';
    container.classList.replace('light', 'dark');
    modeButton.innerText = 'Light Mode';
    localStorage.setItem('modeButton', 'dark');
}

// Light mode settings
function toLight() {
    document.body.className = 'light';
    container.classList.replace('dark', 'light');
    modeButton.innerText = 'Dark Mode';
    localStorage.setItem('modeButton', 'light');
}


/*
//local storage
const prodsJSON = JSON.stringify(products);
console.log(prodsJSON);

localStorage.setItem('stock', prodsJSON);
*/