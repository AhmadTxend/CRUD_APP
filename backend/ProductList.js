let editingProductIndex;
const openModal = document.getElementById('openModal');
const editModal=document.getElementById('editModal');

const DeleteProduct=((index)=>{

    
    Swal.fire({
        title: "Are you sure?",
        text: "Do you want to delete this product?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel"
    }).then((result) => {
        if (result.isConfirmed) {
            // Proceed with deletion if confirmed
            let products = JSON.parse(localStorage.getItem('products')) || [];
            products.splice(index, 1);
            localStorage.setItem('products', JSON.stringify(products));
            DisplayProducts();

            Swal.fire("Deleted!", "Product has been deleted.", "success");
        }
    });
})


const EditProduct_ShowModal=((index)=>{

    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products[index];
    
    document.getElementById('EditProductId').value = product.id;
    document.getElementById('EditProductName').value = product.name;
    document.getElementById('EditProductCategory').value = product.category;
    console.log(document.getElementById('EditProductCategory').value);    
    editingProductIndex = index;
    
    editModal.classList.remove('hidden');
    editModal.classList.add('flex'); 
})


const EditProduct=(()=>{
    let products = JSON.parse(localStorage.getItem('products')) || [];
    
    const updatedProduct = {
        id: document.getElementById('EditProductId').value,
        name: document.getElementById('EditProductName').value,
        category: document.getElementById('EditProductCategory').value
    };
    
    products[editingProductIndex] = updatedProduct;
    localStorage.setItem('products', JSON.stringify(products));
    DisplayProducts();
    
    editModal.classList.remove('flex');
    editModal.classList.add('hidden'); 
    showEditAlert();
}) 


const DisplayProducts=(()=>{
    
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';  
    
    if (products.length === 0) 
    {
        productList.innerHTML = '<div class="alert alert-warning">No products found.</div>';
    }
    else
    {
        products.forEach((product, index) => {
            const productItem = `
            <a href="#" class="list-group-item list-group-item-action" id="productItemDiv" >
            <h6 class="mb-1 productID-link"  onclick="OpenProductDiv(${index})" >Product ID: ${product.id}</h6>
            <p class="mb-1">Product Name: ${product.name}</p>
            
                <small> Category: ${product.category} </small>
                <div>
                    <button class="bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 mt-6 px-4 py-2" onclick="EditProduct_ShowModal(${index})">Edit</button>
                    <button class="bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 mt-6 px-4 py-2" onclick="DeleteProduct(${index})">Delete</button>
                </div>
            
            </a>
            `;
            productList.innerHTML += productItem;
        });
    }
});

const ClearProducts=(()=>{
    localStorage.removeItem('products');
    DisplayProducts();
    showAlert();
}) 

const OpenProductDiv=((index)=>{

    console.log('OpenProductDiv index:', index);
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products[index];

    document.getElementById('ProductId').textContent = product.id;
    document.getElementById('ProductName').textContent = product.name;
    document.getElementById('createdAt').textContent = product.createdAt;
    
    openModal.classList.remove('hidden');
    openModal.classList.add('flex'); 
}) ;

const closeModal=(()=>{
    openModal.classList.add('hidden');
    openModal.classList.remove('flex');
})  
const closeEditModal=(()=>{
    editModal.classList.add('hidden');
    editModal.classList.remove('flex');
})  

const showAlert=(()=>{
    Swal.fire({
        title: "Products Deleted",
        text: "All Products have been removed",
        icon: "success",
        confirmButtonText: "OK"
    });
});

const showEditAlert=(()=>{
    Swal.fire({
        title: "Product Updated",
        text: "Product Updated Successfully",
        icon: "success",
        confirmButtonText: "OK"
    });
});

window.onload = DisplayProducts;
document.getElementById('SaveEditBtn').addEventListener('click',EditProduct);
document.getElementById('ClearProductsBtn').addEventListener('click', ClearProducts);