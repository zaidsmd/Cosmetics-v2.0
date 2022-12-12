let name = document.getElementById('product-name');
let brand = document.getElementById('brand');
let price = document.getElementById('price');
let date = document.getElementById('date');
let category = document.getElementById('category');
let sale = document.querySelector('[name=sale]:checked');
let add = document.getElementById('add');
let table = [];
class Product {
    constructor(name,brand,price,date,category,sale) {
        this.name = name;
        this.brand = brand;
        this.price = price;
        this.date = date;
        this.category = category;
        this.sale=sale;
    }
    details() {
        return `<p>Product Details</p>
                <p>Name: ${this.name}</p>
                <p>Brand: ${this.brand}</p>
                <p>Price: ${this.price} DH</p>
                <p>Date: ${this.date}</p>
                <p>Category: ${this.category}</p>
                <p>On sale: ${this.sale}</p>`
    }
}
if (window.localStorage.table === undefined) {
    window.localStorage.setItem('table','');
}else if (window.localStorage.table !== ''){
    table = JSON.parse(window.localStorage.table);
}
function validation(){
    let key = true;
    if (!(/^[a-z]{1,30}$/i).test(name.value)){
        key = false;
        name.classList.add('invalid');
        name.classList.remove('valid');
    }else {
        name.classList.add('valid');
        name.classList.remove('invalid');
    }
    if (brand.value === ''){
        key =false;
        brand.classList.add('invalid');
        brand.classList.remove('valid');
    }else {
        brand.classList.add('valid');
        brand.classList.remove('invalid')
    }
    if (!(/\d+/).test(price.value)){
        key = false;
        price.classList.add('invalid');
        price.classList.remove('valid');
    }else {
        price.classList.add('valid');
        price.classList.remove('invalid');
    }
    if (date.value === ''){
        key = false;
        date.classList.add('invalid');
        date.classList.remove('valid');
    }else {
        date.classList.add('valid');
        date.classList.remove('invalid');
    }
    if (category.value === '0'){
        key = false;
        category.classList.add('invalid');
        category.classList.remove('valid');
    }else {
        category.classList.add('valid');
        category.classList.remove('invalid');
    }
    if (sale=== null) {
        key = false ;
        document.querySelector('.forRadio').classList.add('invalid');
        document.querySelector('.forRadio').classList.remove('valid');
    }else {
        document.querySelector('.forRadio').classList.add('valid');
        document.querySelector('.forRadio').classList.remove('invalid');
    }
}


