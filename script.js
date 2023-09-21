const itemList = {};
let userLevel = 1000; // Set initial user level to 1000 (all products shown)

function addUserInputs() {
    const userCount = parseInt(document.getElementById('userCount').value, 10);
    const productList = document.getElementById('productList');

    productList.innerHTML = ''; // Clear existing product list

    for (let i = -21; i <= 0; i++) {
        const product = `product${i}`;
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');
        productItem.setAttribute('data-item-name', product);
        productItem.setAttribute('data-required-level', getProductRequiredLevel(product).requiredLevel);

        // Create an image element for the product
        const imageElement = document.createElement('img');
        imageElement.classList.add('product-image');
        imageElement.src = `products/${product}.jpg`; // Set the correct image path
        imageElement.alt = product;
        productItem.appendChild(imageElement.cloneNode());

        // Create a select element for the selling multiple
        const selectElement = document.createElement('select');
        selectElement.id = `${product}Multiplier`;
        productItem.appendChild(document.createElement('br'));

        // Create and append option elements for 1x to 5x
        for (let multiplier = 1; multiplier <= 16; multiplier++) {
            const optionElement = document.createElement('option');
            optionElement.value = multiplier;
            optionElement.text = `${multiplier * 250}`;
            selectElement.appendChild(optionElement);
        }

        productItem.appendChild(selectElement);

        // Create input elements for quantity for each user
        for (let j = 1; j <= userCount; j++) {
            const inputElement = document.createElement('input');
            inputElement.type = 'number';
            inputElement.id = `${product}QuantityUser${j}`;
            inputElement.min = '0';
            inputElement.value = '0';

            // Append the input elements to the product item
            productItem.appendChild(document.createElement('br'));
            productItem.appendChild(document.createTextNode(`User ${j}`));
            productItem.appendChild(document.createElement('br'));
            productItem.appendChild(inputElement);
        }

        productList.appendChild(productItem);
    }


    for (let i = 1; i <= 381; i++) {
        const product = `product${i}`;

        const productItem = document.createElement('div');
        productItem.classList.add('product-item');
        productItem.setAttribute('data-item-name', product);
        productItem.setAttribute('data-required-level', getProductRequiredLevel(product).requiredLevel);

        // Create an image element for the product
        const imageElement = document.createElement('img');
        imageElement.classList.add('product-image');
        imageElement.src = `products/${product}.jpg`; // Set the correct image path
        imageElement.alt = product;
        productItem.appendChild(imageElement.cloneNode());

        // Create a select element for the selling multiple
        productItem.appendChild(document.createElement('br'));
        const selectElement = document.createElement('select');
        selectElement.id = `${product}Multiplier`;

        // Create and append option elements for 1x to 5x
        for (let multiplier = 5; multiplier >= 1; multiplier--) {
            const optionElement = document.createElement('option');
            optionElement.value = multiplier;
            optionElement.text = `${multiplier}x`;
            selectElement.appendChild(optionElement);
        }

        productItem.appendChild(selectElement);

        // Create input elements for quantity for each user
        for (let j = 1; j <= userCount; j++) {
            const inputElement = document.createElement('input');
            inputElement.type = 'number';
            inputElement.id = `${product}QuantityUser${j}`;
            inputElement.min = '0';
            inputElement.value = '0';

            // Append the input elements to the product item
            productItem.appendChild(document.createElement('br'));
            productItem.appendChild(document.createTextNode(`User ${j}`));
            productItem.appendChild(document.createElement('br'));
            productItem.appendChild(inputElement);
        }



        productList.appendChild(productItem);
    }
}



function generateItemList() {
    const itemTableBody = document.querySelector('#itemTable tbody');
    itemTableBody.innerHTML = '';

    const productItems = document.querySelectorAll('.product-item');
    let productCount = 0;
    let newRow;
    let totalPrice = 0;


    productItems.forEach((productItem) => {
        const requiredLevel = parseInt(productItem.getAttribute('data-required-level'), 10);
        const itemInputs = productItem.querySelectorAll('input[type="number"]');
        const selectElement = productItem.querySelector('select');
        const sellingMultiple = parseInt(selectElement.value, 10);

        let totalQuantity = 0;

        itemInputs.forEach((input) => {
            const quantity = parseInt(input.value, 10);
            totalQuantity += quantity;
        });

        if (totalQuantity >= 1 && userLevel >= requiredLevel) {
            const itemName = productItem.getAttribute('data-item-name');
            itemList[itemName] = totalQuantity;

            if (productCount % 5 === 0) {
                // Start a new row for every 5th product
                newRow = document.createElement('tr');
                itemTableBody.appendChild(newRow);
            }

            // Create an image element and set its source
            const imageElement = document.createElement('img');
            imageElement.classList.add('product-image');
            imageElement.src = `products/${itemName}.jpg`; // Set the correct image path
            imageElement.alt = itemName;

            // Display the price based on the required level and selling multiple
            const requiredData = getProductRequiredLevel(itemName);
            const price = requiredData.price * sellingMultiple;

            // Calculate the subtotal for the current product
            const subtotal = price * totalQuantity;
            totalPrice += subtotal; // Add to the total price

            const totalAllDiv = document.getElementById('totalAll');
            totalAllDiv.style.display = 'block'; // Show the totalAll div

            // Add the product image, item name, total quantity, and price to the current row
            newRow.innerHTML += `
                <td>${imageElement.outerHTML}</td>
                <td><h3> Quantity = ${totalQuantity} </h3><br>
                One unit <img src="photos/Coins.jpg" alt="Coins" width="20px"> = ${price} <br> <br> 
                All together :<br>
                <img src="photos/Coins.jpg" alt="Coins" width="20px"> =  ${subtotal} <br>
                <img src="products/product56.jpg" alt="" width="20px"> =  ${((price * totalQuantity) / 327).toFixed(2)} <br> 
                <img src="products/product112.jpg" alt="" width="20px"> = ${((price * totalQuantity) / 824).toFixed(2)} <br> 
                <img src="products/product160.jpg" alt="" width="20px"> = ${((price * totalQuantity) / 1098).toFixed(2)} <br> </td>
            `;
            productCount++;
        } else {
            // Hide irrelevant products
            productItem.style.display = 'none';
        }

        const totalElement = document.getElementById('totalPrice');
        totalElement.textContent = `${totalPrice}`;


        const totalElementD = document.getElementById('totalPriceD');
        totalElementD.textContent = `${(totalPrice / 327).toFixed(2)} `;


        const totalElementR = document.getElementById('totalPriceR');
        totalElementR.textContent = `${(totalPrice / 824).toFixed(2)} `;

        const totalElementB = document.getElementById('totalPriceB');
        totalElementB.textContent = `${(totalPrice / 1098).toFixed(2)} `;
    });
}

function filterProducts() {
    userLevel = parseInt(document.getElementById('gameLevel').value, 10);
    const productItems = document.querySelectorAll('.product-item');

    productItems.forEach((productItem) => {
        const requiredLevel = parseInt(productItem.getAttribute('data-required-level'), 10);
        if (userLevel >= requiredLevel) {
            productItem.style.display = 'block';
        } else {
            productItem.style.display = 'none';
        }
    });
}

// Function to get the required level and price of a product
function getProductRequiredLevel(productName) {
    const productData = {


        product0: { requiredLevel: 1, price: 500 },
        product1: { requiredLevel: 1, price: 3 },
        product2: { requiredLevel: 1, price: 18 },
        product3: { requiredLevel: 2, price: 7 },
        product4: { requiredLevel: 2, price: 21 },
        product5: { requiredLevel: 3, price: 7 },
        product6: { requiredLevel: 5, price: 10 },
        product7: { requiredLevel: 6, price: 14 },
        product8: { requiredLevel: 6, price: 32 },
        product9: { requiredLevel: 6, price: 50 },
        product10: { requiredLevel: 7, price: 14 },
        product11: { requiredLevel: 7, price: 72 },
        product12: { requiredLevel: 7, price: 32 },
        product13: { requiredLevel: 8, price: 32 },
        product14: { requiredLevel: 9, price: 7 },
        product15: { requiredLevel: 9, price: 82 },
        product16: { requiredLevel: 9, price: 108 },
        product17: { requiredLevel: 10, price: 14 },
        product18: { requiredLevel: 10, price: 50 },
        product19: { requiredLevel: 10, price: 104 },
        product20: { requiredLevel: 11, price: 201 },
        product21: { requiredLevel: 12, price: 122 },
        product22: { requiredLevel: 13, price: 25 },
        product23: { requiredLevel: 13, price: 50 },
        product24: { requiredLevel: 14, price: 82 },
        product25: { requiredLevel: 15, price: 32 },
        product26: { requiredLevel: 15, price: 158 },
        product27: { requiredLevel: 15, price: 39 },
        product28: { requiredLevel: 16, price: 14 },
        product29: { requiredLevel: 16, price: 54 },
        product30: { requiredLevel: 16, price: 126 },
        product31: { requiredLevel: 17, price: 151 },
        product32: { requiredLevel: 18, price: 28 },
        product33: { requiredLevel: 18, price: 219 },
        product34: { requiredLevel: 18, price: 90 },
        product35: { requiredLevel: 18, price: 108 },
        product36: { requiredLevel: 18, price: 180 },
        product37: { requiredLevel: 19, price: 46 },
        product38: { requiredLevel: 19, price: 140 },
        product39: { requiredLevel: 19, price: 111 },
        product40: { requiredLevel: 19, price: 241 },
        product41: { requiredLevel: 20, price: 208 },
        product42: { requiredLevel: 21, price: 165 },
        product43: { requiredLevel: 21, price: 309 },
        product44: { requiredLevel: 22, price: 68 },
        product45: { requiredLevel: 23, price: 219 },
        product46: { requiredLevel: 23, price: 255 },
        product47: { requiredLevel: 24, price: 284 },
        product48: { requiredLevel: 24, price: 18 },
        product49: { requiredLevel: 24, price: 21 },
        product50: { requiredLevel: 24, price: 32 },
        product51: { requiredLevel: 24, price: 147 },
        product52: { requiredLevel: 25, price: 36 },
        product53: { requiredLevel: 25, price: 122 },
        product54: { requiredLevel: 25, price: 180 },
        product55: { requiredLevel: 25, price: 205 },
        product56: { requiredLevel: 25, price: 327 },
        product57: { requiredLevel: 26, price: 82 },
        product58: { requiredLevel: 26, price: 226 },
        product59: { requiredLevel: 26, price: 46 },
        product60: { requiredLevel: 27, price: 0 },
        product61: { requiredLevel: 27, price: 0 },
        product62: { requiredLevel: 27, price: 0 },
        product63: { requiredLevel: 27, price: 0 },
        product64: { requiredLevel: 27, price: 0 },
        product65: { requiredLevel: 27, price: 54 },
        product66: { requiredLevel: 27, price: 226 },
        product67: { requiredLevel: 28, price: 270 },
        product68: { requiredLevel: 28, price: 226 },
        product69: { requiredLevel: 28, price: 129 },
        product70: { requiredLevel: 29, price: 172 },
        product71: { requiredLevel: 30, price: 43 },
        product72: { requiredLevel: 30, price: 118 },
        product73: { requiredLevel: 30, price: 216 },
        product74: { requiredLevel: 30, price: 0 },
        product75: { requiredLevel: 30, price: 0 },
        product76: { requiredLevel: 31, price: 162 },
        product77: { requiredLevel: 31, price: 205 },
        product78: { requiredLevel: 32, price: 14 },
        product79: { requiredLevel: 32, price: 64 },
        product80: { requiredLevel: 33, price: 162 },
        product81: { requiredLevel: 33, price: 190 },
        product82: { requiredLevel: 33, price: 10 },
        product83: { requiredLevel: 33, price: 108 },
        product84: { requiredLevel: 33, price: 352 },
        product85: { requiredLevel: 34, price: 50 },
        product86: { requiredLevel: 34, price: 223 },
        product87: { requiredLevel: 34, price: 14 },
        product88: { requiredLevel: 34, price: 129 },
        product89: { requiredLevel: 34, price: 331 },
        product90: { requiredLevel: 34, price: 50 },
        product91: { requiredLevel: 35, price: 72 },
        product92: { requiredLevel: 35, price: 36 },
        product93: { requiredLevel: 35, price: 316 },
        product94: { requiredLevel: 35, price: 298 },
        product95: { requiredLevel: 35, price: 219 },
        product96: { requiredLevel: 36, price: 320 },
        product97: { requiredLevel: 36, price: 367 },
        product98: { requiredLevel: 36, price: 86 },
        product99: { requiredLevel: 36, price: 252 },
        product100: { requiredLevel: 37, price: 226 },


        product101: { requiredLevel: 37, price: 388 },
        product102: { requiredLevel: 38, price: 309 },
        product103: { requiredLevel: 38, price: 334 },
        product104: { requiredLevel: 38, price: 514 },
        product105: { requiredLevel: 39, price: 284 },
        product106: { requiredLevel: 39, price: 280 },
        product107: { requiredLevel: 39, price: 342 },
        product108: { requiredLevel: 39, price: 68 },
        product109: { requiredLevel: 39, price: 727 },
        product110: { requiredLevel: 39, price: 154 },
        product111: { requiredLevel: 40, price: 360 },
        product112: { requiredLevel: 40, price: 824 },
        product113: { requiredLevel: 41, price: 244 },
        product114: { requiredLevel: 41, price: 658 },
        product115: { requiredLevel: 42, price: 64 },
        product116: { requiredLevel: 42, price: 248 },
        product117: { requiredLevel: 42, price: 482 },
        product118: { requiredLevel: 43, price: 219 },
        product119: { requiredLevel: 44, price: 248 },
        product120: { requiredLevel: 44, price: 0 },
        product121: { requiredLevel: 44, price: 201 },
        product122: { requiredLevel: 45, price: 403 },
        product123: { requiredLevel: 45, price: 291 },
        product124: { requiredLevel: 46, price: 259 },
        product125: { requiredLevel: 46, price: 612 },
        product126: { requiredLevel: 47, price: 316 },
        product127: { requiredLevel: 47, price: 478 },
        product128: { requiredLevel: 48, price: 288 },
        product129: { requiredLevel: 48, price: 417 },
        product130: { requiredLevel: 48, price: 234 },
        product131: { requiredLevel: 48, price: 370 },
        product132: { requiredLevel: 49, price: 208 },
        product133: { requiredLevel: 49, price: 392 },
        product134: { requiredLevel: 49, price: 43 },
        product135: { requiredLevel: 49, price: 302 },
        product136: { requiredLevel: 50, price: 270 },
        product137: { requiredLevel: 50, price: 0 },
        product138: { requiredLevel: 50, price: 140 },
        product139: { requiredLevel: 50, price: 18 },
        product140: { requiredLevel: 50, price: 176 },
        product141: { requiredLevel: 51, price: 255 },
        product142: { requiredLevel: 51, price: 676 },
        product143: { requiredLevel: 51, price: 255 },
        product144: { requiredLevel: 52, price: 176 },
        product145: { requiredLevel: 52, price: 360 },
        product146: { requiredLevel: 52, price: 14 },
        product147: { requiredLevel: 52, price: 68 },
        product148: { requiredLevel: 53, price: 298 },
        product149: { requiredLevel: 53, price: 21 },
        product150: { requiredLevel: 54, price: 154 },
        product151: { requiredLevel: 54, price: 460 },
        product152: { requiredLevel: 54, price: 450 },
        product153: { requiredLevel: 56, price: 18 },
        product154: { requiredLevel: 56, price: 489 },
        product155: { requiredLevel: 57, price: 82 },
        product156: { requiredLevel: 57, price: 342 },
        product157: { requiredLevel: 58, price: 32 },
        product158: { requiredLevel: 58, price: 745 },
        product159: { requiredLevel: 59, price: 637 },
        product160: { requiredLevel: 59, price: 1098 },
        product161: { requiredLevel: 60, price: 684 },
        product162: { requiredLevel: 60, price: 277 },
        product163: { requiredLevel: 60, price: 14 },
        product164: { requiredLevel: 60, price: 198 },
        product165: { requiredLevel: 61, price: 532 },
        product166: { requiredLevel: 62, price: 367 },
        product167: { requiredLevel: 62, price: 723 },
        product168: { requiredLevel: 62, price: 345 },
        product169: { requiredLevel: 62, price: 234 },
        product170: { requiredLevel: 63, price: 21 },
        product171: { requiredLevel: 63, price: 550 },
        product172: { requiredLevel: 63, price: 468 },
        product173: { requiredLevel: 64, price: 763 },
        product174: { requiredLevel: 64, price: 547 },
        product175: { requiredLevel: 64, price: 309 },
        product176: { requiredLevel: 65, price: 338 },
        product177: { requiredLevel: 65, price: 648 },
        product178: { requiredLevel: 65, price: 259 },
        product179: { requiredLevel: 65, price: 514 },
        product180: { requiredLevel: 65, price: 18 },
        product181: { requiredLevel: 65, price: 270 },
        product182: { requiredLevel: 66, price: 93 },
        product183: { requiredLevel: 66, price: 378 },
        product184: { requiredLevel: 66, price: 468 },
        product185: { requiredLevel: 66, price: 583 },
        product186: { requiredLevel: 66, price: 320 },
        product187: { requiredLevel: 67, price: 43 },
        product188: { requiredLevel: 67, price: 759 },
        product189: { requiredLevel: 67, price: 446 },
        product190: { requiredLevel: 67, price: 486 },
        product191: { requiredLevel: 68, price: 39 },
        product192: { requiredLevel: 68, price: 190 },
        product193: { requiredLevel: 68, price: 896 },
        product194: { requiredLevel: 68, price: 619 },
        product195: { requiredLevel: 69, price: 230 },
        product196: { requiredLevel: 69, price: 255 },
        product197: { requiredLevel: 69, price: 205 },
        product198: { requiredLevel: 70, price: 349 },
        product199: { requiredLevel: 70, price: 468 },
        product200: { requiredLevel: 70, price: 14 },

        product201: { requiredLevel: 70, price: 266 },
        product202: { requiredLevel: 71, price: 97 },
        product203: { requiredLevel: 71, price: 295 },
        product204: { requiredLevel: 71, price: 234 },
        product205: { requiredLevel: 71, price: 601 },
        product206: { requiredLevel: 72, price: 327 },
        product207: { requiredLevel: 72, price: 457 },
        product208: { requiredLevel: 72, price: 619 },
        product209: { requiredLevel: 72, price: 475 },
        product210: { requiredLevel: 72, price: 14 },
        product211: { requiredLevel: 72, price: 198 },
        product212: { requiredLevel: 73, price: 100 },
        product213: { requiredLevel: 73, price: 432 },
        product214: { requiredLevel: 73, price: 500 },
        product215: { requiredLevel: 74, price: 36 },
        product216: { requiredLevel: 74, price: 457 },
        product217: { requiredLevel: 74, price: 558 },
        product218: { requiredLevel: 74, price: 532 },
        product219: { requiredLevel: 74, price: 266 },
        product220: { requiredLevel: 75, price: 370 },
        product221: { requiredLevel: 75, price: 468 },
        product222: { requiredLevel: 75, price: 226 },
        product223: { requiredLevel: 76, price: 100 },
        product224: { requiredLevel: 76, price: 435 },
        product225: { requiredLevel: 76, price: 367 },
        product226: { requiredLevel: 76, price: 648 },
        product227: { requiredLevel: 76, price: 234 },
        product228: { requiredLevel: 76, price: 129 },
        product229: { requiredLevel: 77, price: 252 },
        product230: { requiredLevel: 77, price: 396 },
        product231: { requiredLevel: 77, price: 136 },
        product232: { requiredLevel: 77, price: 230 },
        product233: { requiredLevel: 78, price: 316 },
        product234: { requiredLevel: 78, price: 399 },
        product235: { requiredLevel: 78, price: 529 },
        product236: { requiredLevel: 78, price: 255 },
        product237: { requiredLevel: 78, price: 28 },
        product238: { requiredLevel: 78, price: 270 },
        product239: { requiredLevel: 78, price: 435 },
        product240: { requiredLevel: 79, price: 392 },
        product241: { requiredLevel: 79, price: 464 },
        product242: { requiredLevel: 79, price: 637 },
        product243: { requiredLevel: 79, price: 464 },
        product244: { requiredLevel: 79, price: 543 },
        product245: { requiredLevel: 79, price: 313 },
        product246: { requiredLevel: 79, price: 464 },
        product247: { requiredLevel: 80, price: 43 },
        product248: { requiredLevel: 80, price: 241 },
        product249: { requiredLevel: 80, price: 306 },
        product250: { requiredLevel: 80, price: 352 },
        product251: { requiredLevel: 81, price: 190 },
        product252: { requiredLevel: 81, price: 439 },
        product253: { requiredLevel: 81, price: 626 },
        product254: { requiredLevel: 82, price: 36 },
        product255: { requiredLevel: 82, price: 241 },
        product256: { requiredLevel: 82, price: 597 },
        product257: { requiredLevel: 82, price: 594 },
        product258: { requiredLevel: 83, price: 410 },
        product259: { requiredLevel: 83, price: 450 },
        product260: { requiredLevel: 83, price: 313 },
        product261: { requiredLevel: 83, price: 21 },
        product262: { requiredLevel: 83, price: 345 },
        product263: { requiredLevel: 83, price: 572 },
        product264: { requiredLevel: 84, price: 554 },
        product265: { requiredLevel: 84, price: 32 },
        product266: { requiredLevel: 84, price: 104 },
        product267: { requiredLevel: 84, price: 417 },
        product268: { requiredLevel: 84, price: 327 },
        product269: { requiredLevel: 84, price: 403 },
        product270: { requiredLevel: 84, price: 324 },
        product271: { requiredLevel: 85, price: 32 },
        product272: { requiredLevel: 85, price: 162 },
        product273: { requiredLevel: 85, price: 288 },
        product274: { requiredLevel: 86, price: 331 },
        product275: { requiredLevel: 86, price: 241 },
        product276: { requiredLevel: 86, price: 507 },
        product277: { requiredLevel: 86, price: 597 },
        product278: { requiredLevel: 86, price: 273 },
        product279: { requiredLevel: 86, price: 230 },
        product280: { requiredLevel: 87, price: 432 },
        product281: { requiredLevel: 87, price: 576 },
        product282: { requiredLevel: 87, price: 237 },
        product283: { requiredLevel: 87, price: 302 },
        product284: { requiredLevel: 87, price: 270 },
        product285: { requiredLevel: 88, price: 504 },
        product286: { requiredLevel: 88, price: 104 },
        product287: { requiredLevel: 88, price: 277 },
        product288: { requiredLevel: 88, price: 169 },
        product289: { requiredLevel: 88, price: 388 },
        product290: { requiredLevel: 88, price: 18 },
        product291: { requiredLevel: 88, price: 64 },
        product292: { requiredLevel: 89, price: 255 },
        product293: { requiredLevel: 89, price: 450 },
        product294: { requiredLevel: 89, price: 10 },
        product295: { requiredLevel: 89, price: 216 },
        product296: { requiredLevel: 89, price: 306 },
        product297: { requiredLevel: 90, price: 554 },
        product298: { requiredLevel: 90, price: 14 },
        product299: { requiredLevel: 90, price: 324 },

        product300: { requiredLevel: 91, price: 424 },
        product301: { requiredLevel: 91, price: 493 },
        product302: { requiredLevel: 91, price: 295 },
        product303: { requiredLevel: 91, price: 270 },
        product304: { requiredLevel: 92, price: 39 },
        product305: { requiredLevel: 92, price: 252 },
        product306: { requiredLevel: 92, price: 302 },
        product307: { requiredLevel: 92, price: 108 },
        product308: { requiredLevel: 92, price: 349 },
        product309: { requiredLevel: 92, price: 111 },
        product310: { requiredLevel: 93, price: 298 },
        product311: { requiredLevel: 93, price: 313 },
        product312: { requiredLevel: 93, price: 363 },
        product313: { requiredLevel: 93, price: 403 },
        product314: { requiredLevel: 94, price: 82 },
        product315: { requiredLevel: 94, price: 352 },
        product316: { requiredLevel: 94, price: 385 },
        product317: { requiredLevel: 94, price: 18 },
        product318: { requiredLevel: 94, price: 219 },
        product319: { requiredLevel: 95, price: 442 },
        product320: { requiredLevel: 95, price: 604 },
        product321: { requiredLevel: 95, price: 471 },
        product322: { requiredLevel: 95, price: 18 },
        product323: { requiredLevel: 95, price: 277 },
        product324: { requiredLevel: 96, price: 403 },
        product325: { requiredLevel: 96, price: 176 },
        product326: { requiredLevel: 96, price: 118 },
        product327: { requiredLevel: 96, price: 151 },
        product328: { requiredLevel: 97, price: 255 },
        product329: { requiredLevel: 97, price: 162 },
        product330: { requiredLevel: 97, price: 100 },
        product331: { requiredLevel: 97, price: 230 },
        product332: { requiredLevel: 98, price: 698 },
        product333: { requiredLevel: 98, price: 406 },
        product334: { requiredLevel: 98, price: 226 },
        product335: { requiredLevel: 98, price: 219 },
        product336: { requiredLevel: 99, price: 442 },
        product337: { requiredLevel: 99, price: 320 },
        product338: { requiredLevel: 99, price: 212 },
        product339: { requiredLevel: 99, price: 644 },
        product340: { requiredLevel: 100, price: 511 },
        product341: { requiredLevel: 100, price: 658 },
        product342: { requiredLevel: 100, price: 288 },
        product343: { requiredLevel: 100, price: 417 },
        product344: { requiredLevel: 101, price: 280 },
        product345: { requiredLevel: 101, price: 108 },
        product346: { requiredLevel: 101, price: 421 },
        product347: { requiredLevel: 102, price: 522 },
        product348: { requiredLevel: 102, price: 266 },
        product349: { requiredLevel: 102, price: 522 },
        product350: { requiredLevel: 102, price: 320 },
        product351: { requiredLevel: 103, price: 223 },
        product352: { requiredLevel: 103, price: 234 },
        product353: { requiredLevel: 104, price: 176 },
        product354: { requiredLevel: 104, price: 540 },
        product355: { requiredLevel: 104, price: 475 },
        product356: { requiredLevel: 104, price: 111 },
        product357: { requiredLevel: 104, price: 252 },
        product358: { requiredLevel: 104, price: 421 },
        product359: { requiredLevel: 105, price: 529 },
        product360: { requiredLevel: 106, price: 352 },
        product361: { requiredLevel: 106, price: 284 },
        product362: { requiredLevel: 106, price: 518 },
        product363: { requiredLevel: 107, price: 111 },
        product364: { requiredLevel: 107, price: 313 },
        product365: { requiredLevel: 108, price: 590 },
        product366: { requiredLevel: 108, price: 316 },
        product367: { requiredLevel: 109, price: 374 },
        product368: { requiredLevel: 109, price: 457 },
        product369: { requiredLevel: 109, price: 370 },
        product370: { requiredLevel: 109, price: 280 },
        product371: { requiredLevel: 109, price: 583 },
        product372: { requiredLevel: 110, price: 464 },
        product373: { requiredLevel: 111, price: 1141 },
        product374: { requiredLevel: 112, price: 572 },
        product375: { requiredLevel: 112, price: 295 },
        product376: { requiredLevel: 114, price: 712 },
        product377: { requiredLevel: 114, price: 198 },
        product378: { requiredLevel: 114, price: 604 },
        product379: { requiredLevel: 117, price: 558 },
        product380: { requiredLevel: 117, price: 637 },
        product381: { requiredLevel: 119, price: 424 },
    };

    for (let i = 1; i <= 21; i++) {
        const productName = `product-${i}`;
        productData[productName] = { requiredLevel: 1, price: 250 };
    }

    return productData[productName] || { requiredLevel: 1, price: 0 };
}
