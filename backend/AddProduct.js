const AddProduct=(()=>{
    const productid = document.getElementById('ProductId').value;
    const productName = document.getElementById('ProductName').value;
    const productCategory = document.getElementById('categoriesSelect').value;

    const createdAt = moment().format("DD, MMM, YYYY - HH:mm");

    if (!productid || !productName || !productCategory) {
        showRequiredFieldAlert();
        return;
    }

    const product = {
        id: productid,
        name: productName,
        category: productCategory,
        createdAt: createdAt
    };
    let products = localStorage.getItem('products');
    products = products ? JSON.parse(products) : [];
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));

    document.getElementById('ProductId').value = '';
    document.getElementById('ProductName').value = '';
    document.getElementById('categoriesSelect').value = 'Select a category';

    showAlert();
})


const showAlert=(()=>{
    Swal.fire({
        title: "Added",
        text: "Product added successfully!",
        icon: "success",
        confirmButtonText: "OK"
    });
});

const showRequiredFieldAlert=(()=>{
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "All field are required!",
      });
});

document.getElementById('AddProductBtn').addEventListener('click',AddProduct); 

