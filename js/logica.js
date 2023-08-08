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




//let searchContainer = document.getElementById('search')
/*
function filterByPrice(maxPrice){
    const filtered = shirts.filter((shirt) => shirt.price <= maxPrice);
    console.log(filtered);
    return filtered;
}

let selectedPrice = parseFloat(prompt('Precio máximo de prenda que buscas(0-exit)'));

while(selectedPrice != 0){
    if(isNaN(selectedPrice) || selectedPrice < 0){
        alert('Por favor, ingresa un número válido');
    }else{
        const filteredProducts = filterByPrice(selectedPrice);
        console.table(filteredProducts);
        productRendering(filteredProducts);
    }
    selectedPrice = parseFloat(prompt('Precio máximo de prenda que buscas(0-exit)'));
}*/

/*
//Search by name filter
function filterByName(name) {
    const result = shirts.filter(shirt => shirt.name.toLowerCase().includes(name.toLowerCase()));
    return result;
}


document.getElementById('btnSearch').addEventListener('click', function(event) {
    event.preventDefault();
    const nameSearch = document.getElementById('searchInput').value;
    const searchProducts = filterByName(nameSearch);
    console.table(searchProducts);
  // Clear previous results and render the new search results
    searchRendering(searchProducts);
});

//DOM of searchbar
function searchRendering(searchProducts, clearPreviousResults = true) {
    if (clearPreviousResults) {
      // Clear previous search results
    searchContainer.innerHTML = '';
    }
    // Render the search results
    for (const shirt of searchProducts) {
    searchContainer.innerHTML += `
        <div class="card" style="width: 20rem;">
            <img class="card-img-top" src=${shirt.photo} alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${shirt.name}</h5>
                <p class="card-text">Precio $ ${shirt.price}.00</p>
                <a href="#" class="btn btn-primary">Add to Cart</a>
            </div>
        </div>
    `;
    }
}
*/