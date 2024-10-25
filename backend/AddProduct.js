const AddProduct=(()=>{

// }) {
    const productid = document.getElementById('ProductId').value;
    const productName = document.getElementsByName('ProductName')[0].value; 
    // console.log('productName:',productName);
    const productCategory = document.getElementById('categoriesSelect').value;

    const product = {
        id: productid,
        name: productName,
        category: productCategory
    };
    let products = localStorage.getItem('products');
    products = products ? JSON.parse(products) : [];
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));

    document.getElementById('ProductId').value = '';
    document.getElementsByName('ProductName')[0].value = '';
    document.getElementById('categoriesSelect').value = 'Select a category';

    alert('Product added successfully!');
})

document.getElementById('AddProductBtn').addEventListener('click',AddProduct); 
