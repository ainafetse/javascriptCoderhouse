console.table(products);
const cart = [];
let productContainer = document.getElementById('products')
let cartItems = document.getElementById("cartItems");

//DOM
function productRendering(productList){
    //we empty the container to avoid dupplicates
    productContainer.innerHTML += "";
    //Loading the cards of the requested products
    for(const product of productList){
        productContainer.innerHTML += `
        <div class="card" style="width: 20rem;">
            <img class="card-img-top" src=${product.photo} alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">Precio $ ${product.price}.00</p>
                <button id=${product.id} class="btn btn-outline-primary buy">Add to cart</button>
            </div>
        </div>
        `;
    }
    //events
    let buttons = document.getElementsByClassName("buy");
    for (const button of buttons){
        //opcion 1 - addEventListener
        button.addEventListener('click',()=>{
            console.log('there is a click on the button id: '+button.id);
            const itemToCart = products.find((product) => product.id == button.id)
            console.log(itemToCart);
            addToCart(itemToCart);
        })
        //opcion 2 (hover)
        button.onmouseover = () => button.classList.replace('btn-outline-primary', 'btn-primary');
        button.onmouseout = () => button.classList.replace('btn-primary', 'btn-outline-primary');
    }
}

productRendering(products);

function addToCart(product){
    cart.push(product);
    console.table(cart);
    cartItems.innerHTML += `
    <tr>
        <td>${product.id}</td>
        <td><img src="${product.photo}" alt="${product.name}" class="cart-size"></td>
        <td>${product.name}</td>
        <td>$ ${product.price}.00</td>
    </tr>
    `
}

//eventos de teclado
let emailNewsletter = document.getElementById('email');

emailNewsletter.onkeyup = () => {
    if(emailNewsletter.value.length < 13 || ((!emailNewsletter.value.includes('@')|| !emailNewsletter.value.includes('.')))){
        console.log('invalid email')
        emailNewsletter.style.color ='#bb0f0f';
        document.getElementById('emailHelp').innerText = "Please enter a valid e-mail adress.";
    }else{
        emailNewsletter.style.color ='black';
        document.getElementById('emailHelp').innerText = "Cool email! :)";
    }
}

emailNewsletter.onchange = () => {
    document.getElementById('emailHelp').innerText = "We'll never share your email with anyone else.";
}

let formNewsletter = document.getElementById('formNewsletter');
formNewsletter.addEventListener('submit', validate);

function validate(ev){
    if(emailNewsletter.value == ''){
        ev.preventDefault();
        alert('Enter a valid email')
    }
}

//local storage
const prodsJSON = JSON.stringify(products);
console.log(prodsJSON);

localStorage.setItem('stock', prodsJSON);


//dark & light mode
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

function toDark() {
    document.body.className = 'dark';
    container.classList.replace('light', 'dark');
    modeButton.innerText = 'Light Mode';
    localStorage.setItem('modeButton', 'dark');
}

function toLight() {
    document.body.className = 'light';
    container.classList.replace('dark', 'light');
    modeButton.innerText = 'Dark Mode';
    localStorage.setItem('modeButton', 'light');
}
