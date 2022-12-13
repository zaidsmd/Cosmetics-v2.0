let name = document.getElementById('product-name');
let brand = document.getElementById('brand');
let price = document.getElementById('price');
let date = document.getElementById('date');
let category = document.getElementById('category');
let sale = document.querySelector('[name=sale]:checked');
let add = document.getElementById('add');
let update = document.getElementById('update');
let table = [];
let index , indexOfModify;
let inputs = document.querySelectorAll("input:not([type=radio],select)");

class Article {
    constructor(name, brand, price, date, category, sale) {
        this.name = name;
        this.brand = brand;
        this.price = price;
        this.date = date;
        this.category = category;
        this.sale = sale;
    }

    details() {
        return `
                <p>Name: ${this.name}</p>
                <p>Brand: ${this.brand}</p>
                <p>Price: ${this.price}</p>
                <p>Date: ${this.date}</p>
                <p>Category: ${this.category}</p>
                <p>On sale: ${this.sale}</p>`
    }
}

if (window.localStorage.table === undefined) {
    window.localStorage.setItem('table', '');
} else if (window.localStorage.table !== '') {
    table = JSON.parse(window.localStorage.table);
    tableCreating(table);
}

function validation() {
    let key = true;
    if (!(/^[a-z]{1,30}$/i).test(name.value)) {
        console.log('name')
        key = false;
        name.classList.add('invalid');
        name.classList.remove('valid');
    } else {
        name.classList.add('valid');
        name.classList.remove('invalid');
    }
    if (brand.value === '') {
        console.log('brand')
        key = false;
        brand.classList.add('invalid');
        brand.classList.remove('valid');
    } else {
        brand.classList.add('valid');
        brand.classList.remove('invalid')
    }
    if (!(/\d+/).test(price.value)) {
        console.log('price')
        key = false;
        price.classList.add('invalid');
        price.classList.remove('valid');
    } else {
        price.classList.add('valid');
        price.classList.remove('invalid');
    }
    if (date.value === '') {
        console.log('date')
        key = false;
        date.classList.add('invalid');
        date.classList.remove('valid');
    } else {
        date.classList.add('valid');
        date.classList.remove('invalid');
    }
    if (category.value === '0') {
        console.log('cat')
        key = false;
        category.classList.add('invalid');
        category.classList.remove('valid');
    } else {
        category.classList.add('valid');
        category.classList.remove('invalid');
    }
    if (document.querySelector('[name=sale]:checked') === null) {
        console.log('sale')
        key = false;
        document.querySelector('.forRadio').classList.add('invalid');
        document.querySelector('.forRadio').classList.remove('valid');
    } else {
        document.querySelector('.forRadio').classList.add('valid');
        document.querySelector('.forRadio').classList.remove('invalid');
    }
    return key;
}
function tableCreating(arrayOfObjects) {
    document.querySelector('#data').innerHTML=''
    arrayOfObjects.sort(function(a, b) {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });
    arrayOfObjects.forEach(function (product) {
        let modifyBtn = document.createElement('button');
        modifyBtn.innerHTML = 'Modify';
        modifyBtn.classList.add('primary-btn');
        modifyBtn.classList.add('modify')
        let deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = 'Delete';
        deleteBtn.classList.add('secondary-btn');
        deleteBtn.classList.add('delete');
        let row = document.createElement('div');
        row.classList.add('row');
        let lastColumn = document.createElement('div');
        lastColumn.classList.add('column');
        lastColumn.appendChild(deleteBtn);
        lastColumn.appendChild(modifyBtn);
        let data =[product.name,product.brand,product.price,product.date,product.category,product.sale];
        data.forEach(item=>{
            let column = document.createElement('div');
            column.classList.add('column');
            let dataItem = document.createTextNode(item);
            column.appendChild(dataItem);
            row.appendChild(column)
        })
        row.appendChild(lastColumn);
        document.querySelector('#data').appendChild(row);
    })
    document.querySelectorAll('.modify').forEach(button=>{
        button.addEventListener('click',e=>{
            indexOfModify = Array.from(e.target.parentElement.parentElement.parentElement.children).indexOf(e.target.parentElement.parentElement)
            name.value = e.target.parentElement.parentElement.children[0].innerHTML;
            name.setAttribute('value',e.target.parentElement.parentElement.children[0].innerHTML)
            brand.value = e.target.parentElement.parentElement.children[1].innerHTML;
            brand.setAttribute('value',e.target.parentElement.parentElement.children[1].innerHTML)
            price.value = parseFloat(e.target.parentElement.parentElement.children[2].innerHTML.replace(/,/g, ".")).toFixed(2)
            price.setAttribute('value',parseFloat(e.target.parentElement.parentElement.children[2].innerHTML.replace(/,/g, ".")).toFixed(2))
            date.value = e.target.parentElement.parentElement.children[3].innerHTML;
            category.value = e.target.parentElement.parentElement.children[4].innerHTML;
            if (e.target.parentElement.parentElement.children[5].innerHTML=== document.querySelector('#on-sale').value){
                document.querySelector('#on-sale').setAttribute('checked','');
            }else  {
                document.querySelector('#not-on-sale').setAttribute('checked','');
            }
            add.classList.remove('show');
            update.classList.add('show');
        })
    })
    document.querySelectorAll('.delete').forEach(button=>{
        button.addEventListener('click',event=>{
            deleteFromTable();
        })
    })
}
function formReset() {
    inputs.forEach(e => {
        e.value = '';
        e.setAttribute('value', '')
        e.classList.remove('valid')
    })
    date.classList.remove('valid');
    category.classList.remove('valid');
    document.querySelectorAll('.forRadio').forEach(element=>{
        element.classList.remove('valid');
    })
    document.querySelectorAll('[name=sale]').forEach(ele=>{
        ele.removeAttribute('checked');
    })
    document.querySelector('form').reset();
    console.log('reseted')
}
function deleteFromTable(){
    index = Array.from(document.querySelector('#data').children).indexOf(event.target.parentElement.parentElement);
    document.querySelector('#remove-modal').showModal()
}
add.addEventListener('click', () => {
    if (validation() === true) {
        let nameValue = name.value.trim();
        let brandValue = brand.value.trim();
        let priceValue = parseFloat(price.value.replace(/,/g, ".")).toFixed(2) + " DH";
        let dateValue = date.value.trim();
        let categoryValue = category.value;
        let saleValue = document.querySelector('[name=sale]:checked').value;
        let productToAdd = new Article(nameValue,brandValue,priceValue,dateValue,categoryValue,saleValue)
        table.push(productToAdd);
        window.localStorage.table = JSON.stringify(table);
        tableCreating(table);
        formReset();
        document.querySelector('form').reset();
        document.querySelector('#details').innerHTML = productToAdd.details();
        document.querySelector('#add-modal').showModal()
    } else {

    }
})
document.querySelectorAll('.cancel').forEach(button=>{
    button.addEventListener('click', e=>{
        e.target.parentElement.parentElement.close()
    })
})
update.addEventListener('click',()=>{
    if (validation()===true) {
        table[indexOfModify].name = name.value;
        table[indexOfModify].brand = brand.value;
        table[indexOfModify].price =  parseFloat(price.value.replace(/,/g, ".")).toFixed(2) + " DH";
        table[indexOfModify].category = category.value;
        table[indexOfModify].sale = document.querySelector('[name=sale]:checked').value;
        window.localStorage.table = JSON.stringify(table);
        table = JSON.parse(window.localStorage.table)
        tableCreating(table);
        formReset();
        update.classList.remove('show');
        add.classList.add('show');
        tableCreating(table);
    }
})
document.querySelector('#modal-delete').addEventListener('click', deleteButoon=>{
    table.splice(index ,1);
    localStorage.table = JSON.stringify(table);
    tableCreating(table);
    deleteButoon.target.parentElement.parentElement.close();
})