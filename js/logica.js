console.table(shirts);
let productContainer = document.getElementById('search')
let searchContainer = document.getElementById('search')

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
}

//DOM
function productRendering(productList){
    for(const shirt of productList){
        productContainer.innerHTML += `
        <div class="card" style="width: 20rem;">
        <img class="card-img-top" src=${shirt.photo} alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">${shirt.name}</h5>
          <p class="card-text">${shirt.price}</p>
          <a href="#" class="btn btn-primary">Add to Cart</a>
        </div>
      </div>
        `;
    }
}


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
            <p class="card-text">${shirt.price}</p>
            <a href="#" class="btn btn-primary">Add to Cart</a>
        </div>
        </div>
    `;
    }
}
