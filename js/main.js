let totalCompra = 0;

let menu = prompt("Selecciona un producto para agregar al carrito\n Playeras:\n1-T-shirt  $700.00 MXN\n2-Sin mangas $500.00 MXN\n3-Manga larga  $800.00 MXN\n4-CropTop  $450.00 MXN\n Posters\n5-16x9 pulgadas  $350.00 MXN\n6-22x18 pulgadas  $500.00 MXN\n7-45x28 pulgadas  $1,200.00 MXN\n8-50x50 pulgadas  $2,500.00 MXN\n0-Para finalizar compra");

while(menu != "0"){
    switch(menu){
        case "1":
            alert("T-shirt agregada $700.00 MXN");
            sumarTotalCompra(700);
            break;
        case "2":
            alert("Playera sin mangas agregada $500.00 MXN");
            sumarTotalCompra(500);
            break;
        case "3":
            alert("Playera manga larga agregada $800.00 MXN");
            sumarTotalCompra(800);
            break;
        case "4":
            alert("Playera crop top agregada $450.00 MXN");
            sumarTotalCompra(450);
            break;
        case "5":
            alert("Cuadro de 16x9 pulgadas agregado $350.00 MXN");
            sumarTotalCompra(350);
            break;
        case "6":
            alert("Cuadro de 22x18 pulgadas agregado $500.00 MXN");
            sumarTotalCompra(500);
            break;
        case "7":
            alert("Cuadro de 45x28 pulgadas agregado $1,200.00 MXN");
            sumarTotalCompra(1200);
            break;
        case "8":
                alert("Cuadro de 45x45 pulgadas agregado $2,500.00 MXN");
                sumarTotalCompra(2500);
                break;
        default:
            alert("Codigo de producto incorrecto");
            break;
    }
    menu = prompt("Selecciona un producto para agregar al carrito\n Playeras:\n1-T-shirt  $700.00 MXN\n2-Sin mangas $500.00 MXN\n3-Manga larga  $800.00 MXN\n4-CropTop  $450.00 MXN\n Posters\n5-16x9 pulgadas  $350.00 MXN\n6-22x18 pulgadas  $500.00 MXN\n7-45x28 pulgadas  $1,200.00 MXN\n8-50x50 pulgadas  $2,500.00 MXN\n0-Para finalizar compra");
}

alert("Costo total de tu compra $" + totalCompra);

function sumarTotalCompra(precioProducto){
    totalCompra = totalCompra + precioProducto;
    console.log("Subtotal hasta el momento $" + totalCompra);
}