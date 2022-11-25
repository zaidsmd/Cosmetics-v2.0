var inputs = document.querySelectorAll("input:not([type=radio],select)");
var nameKey, brandKey, dateKey, selectKey, priceKey;
var select = document.querySelector('select');
let add = document.getElementById('add');
var table = document.getElementById('table');
inputs.forEach(element => {
    element.addEventListener('keyup', () => {
        if (element.name === 'product-name') {
            if (element.value === '') {
                nameKey = false;
                element.classList.remove('valid')
            } else {
                element.classList.add('valid')
                nameKey = true;
            }
        }
        if (element.name === 'brand') {
            if (element.value === '') {
                brandKey = false;
                element.classList.remove('valid')
            } else {
                element.classList.add('valid')
                brandKey = true;
            }
        }
        if (element.name === 'date') {
            if (element.value === '') {
                dateKey = false;
                element.classList.remove('valid')
            } else {
                element.classList.add('valid')
                dateKey = true;
            }
        }
        if (element.name === 'price') {
            if (element.value === '') {
                priceKey = false;
                element.classList.remove('valid')
            } else {
                element.classList.add('valid')
                priceKey = true;
            }
        }
    })
})
select.addEventListener('change', () => {
    if (document.querySelector('option:checked').value === "0") {
        selectKey = false;
    } else {
        select.classList.add('valid');
        selectKey = true;
    }
})
add.addEventListener('click', () => {
    if (document.querySelector('input:checked') === null) {

    } else {
        if (selectKey && dateKey && nameKey && brandKey && priceKey) {
            let productName = document.querySelector("[name='product-name']").value;
            let brand = document.querySelector("[name='brand']").value;
            let price = Number(document.querySelector('[name=price]').value).toFixed(2);
            let date = document.querySelector('[name=date]').value;
            let category = document.querySelector('option:checked').innerHTML;
            let sale = document.querySelector('label:has([type="radio"]:checked) span').innerHTML;
            let row = document.createElement('div');
            buttons = '';
            row.classList.add('row');
            let data = [productName,brand,price,date,category,sale,buttons];
            for (let i = 0; i <data.length ; i++) {
                var column = document.createElement('div');
                column.classList.add('column');
                var value = document.createTextNode(data[i]);
                column.appendChild(value);
                row.appendChild(column);
            }
            row.lastChild.innerHtml = `<button id="delete" class="secondary-btn">Delete</button>
                    <button id="modify" class="primary-btn">Modify</button>`;
            table.appendChild(row);
        }
    }
})

