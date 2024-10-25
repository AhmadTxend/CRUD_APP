let editingProductIndex;

function DeleteProduct(index)
{
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products.splice(index, 1);  
    localStorage.setItem('products', JSON.stringify(products));
    DisplayProducts();  
}

function EditProduct_ShowModal(index)
{
 
    // if (true)
    // {
    //     var x = 10;
    //     let y = 20;
    // }
    // console.log(x);  
    // console.log(y); 

    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products[index];

    // console.log(product);
    document.getElementById('EditProductId').value = product.id;
    document.getElementById('EditProductName').value = product.name;
    document.getElementById('EditProductCategory').value = product.category;
    editingProductIndex = index;
    
    const editModal = new bootstrap.Modal(document.getElementById('editModal'));
    editModal.show();
}


function EditProduct() 
{
    let products = JSON.parse(localStorage.getItem('products')) || [];

    const updatedProduct = {
        id: document.getElementById('EditProductId').value,
        name: document.getElementById('EditProductName').value,
        category: document.getElementById('EditProductCategory').value
    };

    // console.log(updatedProduct);
    products[editingProductIndex] = updatedProduct;
    localStorage.setItem('products', JSON.stringify(products));
    DisplayProducts();

    const editModal = bootstrap.Modal.getInstance(document.getElementById('editModal'));
    editModal.hide();
}

function DisplayProducts() {
//    const numbers=[1,2,3,4,5]
//     const result = numbers.map(num => {
//         console.log(num * 2);
//     });
//     console.log(result); 

    // const numbers = [1, 2, 3, 4, 5];
    // const result = numbers.map(num => num * 2);
    // console.log(result); 

    const products = JSON.parse(localStorage.getItem('products')) || [];
    const productList = document.getElementById('product-list');
    // console.log(productList)
    productList.innerHTML = '';  

    if (products.length === 0) {
        productList.innerHTML = '<div class="alert alert-warning">No products found.</div>';
    }
    else{
        products.forEach((product, index) => {
            // console.log('index:',index);
            const productItem = `
            <a href="#" class="list-group-item list-group-item-action" id="productItemDiv" >
                <h6 class="mb-1 productID-link"  onclick="OpenProductDiv(${index})" >Product ID: ${product.id}</h6>

                <p class="mb-1">Product Name: ${product.name}</p>

                <span>
                <small> Category: ${product.category} </small>
                    <span>
                        <button class="btn btn-sm btn-primary me-2" onclick="EditProduct_ShowModal(${index})">Edit</button>
                        <button class="btn btn-sm btn-danger" onclick="DeleteProduct(${index})">Delete</button>
                    </span>
                </span>
                
            </a>
            `;
            productList.innerHTML += productItem;
        });
    }
}
//   <div id="prodiv">
//                 <h1 id="pro_h1"></h1>
//   </div>
function ClearProducts() {
    localStorage.removeItem('products');
    DisplayProducts();
    alert('All Products have been removed');
}

function OpenProductDiv(index)
{
    console.log('OpenProductDiv index:',index)
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products[index];

    console.log(product);
    document.getElementById('ProductId').textContent = product.id;
    document.getElementById('ProductName').innerHTML = product.name;
    // document.getElementById('EditProductName').value = product.name;
    // document.getElementById('EditProductCategory').value = product.category;
    // editingProductIndex = index;

    const openModal = new bootstrap.Modal(document.getElementById('openModal'));
    openModal.show();
}

window.onload = DisplayProducts;

document.getElementById('SaveEditBtn').addEventListener('click',EditProduct);
document.getElementById('ClearProductsBtn').addEventListener('click', ClearProducts);