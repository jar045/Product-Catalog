const uri = 'api/Products';
let products = [];

function getProducts() {
    fetch(uri)
        .then(response => response.json())
        .then(data => _displayProducts(data))
        .catch(error => console.error('Unable to get products.', error));
}

function addProduct() {
    const addNameTextbox = document.getElementById('add-name');
    const addDescriptionTextbox = document.getElementById('add-description');
    const addQuantityTextbox = document.getElementById('add-quantity');

    const product = {
        name: addNameTextbox.value.trim(),
        description: addDescriptionTextbox.value.trim(),
        quantity: addQuantityTextbox.value.trim()
    };

    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })

        .then(response => checkIfNameExists(response))
        .then(() => {
            getProducts();
            addNameTextbox.value = '';
            addDescriptionTextbox.value = '';
            addQuantityTextbox.value = '';
        })
        .catch(error => console.error('Unable to add product.', error));
}

function checkIfNameExists(response) {
    if (response.status == 400) {
        alert("A product with that name already exists.");
    }
}


function _displayProducts(data) {
    if (data.length == 0) {
        
        tBody.innerHTML = 'EMPTY';
    }
    
    const tBody = document.getElementById('productsView');
    tBody.innerHTML = '';

    data.forEach(item => {

        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        let tmpName = document.createTextNode(item.name)
        td1.appendChild(tmpName);

        let td2 = tr.insertCell(1);
        let tmpDescription = document.createTextNode(item.description);
        td2.appendChild(tmpDescription);

        let td3 = tr.insertCell(2);
        let tmpQuantity = document.createTextNode(item.quantity);
        td3.appendChild(tmpQuantity);

    });

    products = data;
}