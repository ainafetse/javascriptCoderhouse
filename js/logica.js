console.table(products);
let cart = [];
let productContainer = document.getElementById('products');
let cartItems = document.getElementById("cartItems");
let lastShownProductIndex = 12; //product index variable
const numProductsToShow = 12; // Initial number of products to be displayed
const numProductsToAdd = 4;   // Number of products to add when "Load More" is clicked
const loadMoreBtn = document.getElementById('loadMoreBtn');
const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton: 'btn btn-warning m-1',
        cancelButton: 'btn btn-success m-1'
    },
    buttonsStyling: false
})

// DOMContentLoaded event listener & Recovering cart from localStorage when the page reloads
document.addEventListener('DOMContentLoaded', () => {
    updateCartFromLocalStorage();
    updateCartAndUserFromLocalStorage(); // Update user information
    productRendering(lastShownProductIndex);
    // Load More button event listener
    loadMoreBtn.addEventListener('click', () => {
        loadMoreProducts();
    });
});

// DOM
function productRendering(numToShow) {
    productContainer.innerHTML = ""; //Clear the container
    let counter = 0; //Add a counter
    //Loading cards of requested products
    for (let i = 0; i < numToShow; i++) {
        if (counter >= numToShow) {
            break;
        }
        const product = products[i];
        productContainer.innerHTML += `
        <div class="card position-relative" style="width: 17.5rem;">
            <img class="card-img-top" src=${product.photo} alt="Card image cap">
            <div class="overlay">
                <div class="overlay-content">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">Precio $ ${product.price}.00 MXN</p>
                    <button id=${product.id} class="btn btn-light buy"><i class="bi bi-cart-plus-fill"></i></button>
                </div>
            </div>
        </div>
        `;
        counter++;
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
        button.onmouseover = () => button.classList.replace('btn-light', 'btn-warning');
        button.onmouseout = () => button.classList.replace('btn-warning', 'btn-light');
    }
    console.log('Products rendered:', counter);
}

// Function to load more products
function loadMoreProducts() {
    const remainingProducts = products.length - lastShownProductIndex;
    const numToShowNext = Math.min(remainingProducts, numProductsToAdd);

    if (numToShowNext > 0) {
        lastShownProductIndex += numToShowNext;
        productRendering(lastShownProductIndex);
    } else {
        loadMoreBtn.disabled = true;
        loadMoreBtn.textContent = "No more products";
    }
}


// Add item to the cart
function addToCart(product) {
    const existingCartItem = cart.find(item => item.product.id === product.id);
    if (existingCartItem) {
        // If the product is already in the cart, increase its quantity
        existingCartItem.quantity++;
    } else {
        // If the product is not in the cart, add it with a quantity of 1
        cart.push({ product: product, quantity: 1 });
    }
    console.table(cart);
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
    for (const cartItem of cart) {
        const product = cartItem.product;
        const quantity = cartItem.quantity;
        totalPrice += product.price * quantity;
    }
    return totalPrice;
}

// Update total price in the cart table
function updateTotalPrice() {
    const totalPrice = calculateTotalPrice();
    cartTotal.innerHTML = `$${totalPrice.toFixed(2)} MXN`;
}

// Calculate total count of items in the cart
function calculateTotalItemCount() {
    return cart.length;
}

// Update the text of the button
function updatePaymentButton() {
    const totalQuantity = calculateTotalQuantity();
    const btnPayment = document.getElementById('btnPayment');
    btnPayment.innerHTML = `<i class="bi bi-cart"></i> Proceed to payment (${totalQuantity})`;

    // Add event listener to show the modal
    btnPayment.addEventListener('click', () => {
        $('#createAccountModal').modal('show');
    });
}


// Calculate total quantity of items in the cart
function calculateTotalQuantity() {
    let totalQuantity = 0;
    for (const item of cart) {
        totalQuantity += item.quantity;
    }
    return totalQuantity;
}


// Update the cart table with the items from the cart
function updateCartTable() {
    cartItems.innerHTML = '';
    cart.forEach((cartItem, index) => {
        const product = cartItem.product;
        const quantity = cartItem.quantity;

        cartItems.innerHTML += `
            <tr>
                <td>
                    <button class="btn btn-sm btn-light minus-item" data-index="${index}">
                        <i class="bi bi-dash"></i>
                    </button>
                    <button class="btn btn-sm btn-danger remove-item ${quantity === 1 ? '' : 'd-none'}" data-index="${index}">
                        <i class="bi bi-trash"></i>
                    </button>
                    ${quantity}
                    <button class="btn btn-sm btn-light plus-item" data-index="${index}">
                        <i class="bi bi-plus"></i>
                    </button>
                </td>
                <td><img src="${product.photo}" alt="${product.name}" class="cart-size"></td>
                <td>${product.name}</td>
                <td>$ ${product.price}.00 MXN</td>
            </tr>
        `;

        // Hide the minus button if the quantity is 1
        const minusButton = document.getElementsByClassName('minus-item')[index];
        if (quantity === 1) {
            minusButton.classList.add('d-none');
        } else {
            minusButton.classList.remove('d-none');
        }

        // Show the trash button if the quantity is 1
        const trashButton = document.getElementsByClassName('remove-item')[index];
        if (quantity === 1) {
            trashButton.classList.remove('d-none');
        } else {
            trashButton.classList.add('d-none');
        }
    });

    // Calculate and update total price
    updateTotalPrice();

    // Attach event listeners for plus, minus, and remove buttons
    attachCartButtonListeners();
}


// Define the new functions to handle removing, decreasing, and increasing the quantity of items
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartTable();
    saveCartToLocalStorage();
    updatePaymentButton();
}

function decreaseQuantity(index) {
    const cartItem = cart[index];
    if (cartItem.quantity > 1) {
        cartItem.quantity--;
        updateCartTable();
        saveCartToLocalStorage();
        updatePaymentButton();
    }
}

function increaseQuantity(index) {
    const cartItem = cart[index];
    cartItem.quantity++;
    updateCartTable();
    saveCartToLocalStorage();
    updatePaymentButton();
}

// Attach event listeners for plus, minus, and remove buttons
attachCartButtonListeners();


function attachCartButtonListeners() {
    const removeButtons = document.getElementsByClassName('remove-item');
    const minusButtons = document.getElementsByClassName('minus-item');
    const plusButtons = document.getElementsByClassName('plus-item');

    // Convert HTMLCollection to array
    const removeButtonArray = Array.from(removeButtons);
    const minusButtonArray = Array.from(minusButtons);
    const plusButtonArray = Array.from(plusButtons);

    removeButtonArray.forEach(button => {
        button.addEventListener('click', () => {
            const index = button.getAttribute('data-index');
            showDeleteConfirmation(index);
        });
    });

    minusButtonArray.forEach(button => {
        button.addEventListener('click', () => {
            const index = button.getAttribute('data-index');
            decreaseQuantity(index);
        });
    });

    plusButtonArray.forEach(button => {
        button.addEventListener('click', () => {
            const index = button.getAttribute('data-index');
            increaseQuantity(index);
        });
    });
}

function showDeleteConfirmation(index) {
    swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: 'You are about to remove this item from your cart.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, remove it!',
        cancelButtonText: 'No, keep it',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            removeFromCart(index);
            Swal.fire(
                'Removed!',
                'The item has been removed from your cart.',
                'success'
            );
        }
    });
}


// Event listener for the "Clear Cart" button
const btnClearCart = document.getElementById('btnClearCart');
btnClearCart.addEventListener('click', () => {
    swalWithBootstrapButtons.fire({
        title: 'Are you sure you want to empty your cart?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, empty it!'
    }).then((result) => {
        if (result.isConfirmed) {
            clearCart(); // Clear the cart if confirmed
            Swal.fire(
                'Fresh new cart!',
                'Your cart has been emptied.',
                'success'
            );
        }
    });
});

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


////************Login Request*/
// Handle account creation form submission
const createAccountBtn = document.getElementById('createAccountBtn');
createAccountBtn.addEventListener('click', () => {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    // Store user information in local storage
    const user = { name, email };
    localStorage.setItem('user', JSON.stringify(user));

    // Close the modal
    $('#createAccountModal').modal('hide');

    // Update "Proceed to Payment" button text
    updatePaymentButton();
});

// Update the cart from localStorage and user information
function updateCartAndUserFromLocalStorage() {
    cart = getCartFromLocalStorage();
    user = getUserFromLocalStorage();
    updateCartTable();
    updatePaymentButton();
}

// Get user information from localStorage
function getUserFromLocalStorage() {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
}




// *****************Events Newsletter
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