let inputs = document.querySelectorAll("input:not([type=radio],select)");
let nameKey, brandKey, dateKey, selectKey, priceKey;
let select = document.querySelector('select');
let add = document.getElementById('add');
let table = document.getElementById('table');
let dataToModify = [];
let toDelete;
add.addEventListener('click', () => {
    validateInput();
    if (document.querySelector('input:checked') === null) {
    } else {
        if (selectKey && dateKey && nameKey && brandKey && priceKey) {
            let productName = document.querySelector("[name='product-name']").value.trim();
            let brand = document.querySelector("[name='brand']").value.trim();
            let price = '$ ' + Number(document.querySelector('[name=price]').value).toFixed(2);
            let date = document.querySelector('[name=date]').value.trim();
            let category = document.querySelector('option:checked').innerHTML.trim();
            let sale = document.querySelector('[type="radio"]:checked ').value;
            let row = document.createElement('div');
            row.classList.add('row');
            let modifyBtn = document.createElement('button');
            modifyBtn.innerHTML = 'Modify';
            modifyBtn.classList.add('primary-btn');
            modifyBtn.classList.add('modify')
            let deleteBtn = document.createElement('button');
            deleteBtn.innerHTML = 'Delete';
            deleteBtn.classList.add('secondary-btn');
            deleteBtn.classList.add('delete');
            let lastColumn = document.createElement('div');
            lastColumn.classList.add('column');
            lastColumn.appendChild(deleteBtn);
            lastColumn.appendChild(modifyBtn);
            let data = [productName, brand, price, date, category, sale];
            for (let i = 0; i < data.length; i++) {
                let column = document.createElement('div');
                column.classList.add('column');
                let value = document.createTextNode(data[i]);
                column.appendChild(value);
                row.appendChild(column);
            }
            row.appendChild(lastColumn)
            table.appendChild(row);
            document.querySelector('form').reset()
            inputs.forEach(e => {
                e.value = '';
                e.setAttribute('value', '')
                e.classList.remove('valid')
            })
            document.querySelector('select').classList.remove('valid');
            document.querySelector('[type=radio]')
            document.querySelectorAll('.modify').forEach(e => {
                e.addEventListener('click', () => {
                    let selectedRow = Object.values(e.parentElement.parentElement.children);
                    selectedRow.forEach((element, index) => {
                        if (index === 2) {
                            dataToModify.push(Number(element.innerHTML.replace(/^\D+/g, '').trim()))
                        } else if (index <= 5) {
                            dataToModify.push(element.innerHTML);
                        }
                    })
                    dataToModify.forEach((el, i) => {
                        if (i < 4) {
                            inputs[i].value = el;
                        }
                    })
                    document.querySelector(`select`).value = dataToModify[4];
                    console.log(dataToModify[5])
                    if (dataToModify[5] === 'Yes') {
                        document.getElementById('on-sale').setAttribute('checked', '');
                    } else {
                        document.getElementById('not-on-sale').setAttribute('checked', '');
                    }
                    inputs.forEach(e => {
                        e.setAttribute('value', e.value);
                    })
                    add.style.display = 'none';
                    document.getElementById('update').style.display = 'block';
                    document.getElementById('update').addEventListener('click', function () {
                        validateInput();
                        if (document.querySelector('input:checked') === null) {
                        } else {
                            if (selectKey && dateKey && nameKey && brandKey && priceKey) {
                                productName = document.querySelector("[name='product-name']").value.trim();
                                brand = document.querySelector("[name='brand']").value.trim();
                                price = '$ ' + Number(document.querySelector('[name=price]').value).toFixed(2);
                                date = document.querySelector('[name=date]').value.trim();
                                category = document.querySelector('option:checked').innerHTML.trim();
                                sale = document.querySelector('[type="radio"]:checked ').value;
                                let updatedData = [productName, brand, price, date, category, sale]
                                updatedData.forEach((e, i) => {
                                    selectedRow[i].innerHTML = e;
                                })
                                add.style.display = 'block';
                                document.getElementById('update').style.display = 'none'
                                document.querySelector('form').reset()
                                inputs.forEach(e => {
                                    e.value = '';
                                    e.setAttribute('value', '')
                                    e.classList.remove('valid')
                                })
                                document.querySelector('[type=radio]:checked').removeAttribute('checked')
                                document.querySelector('select').classList.remove('valid');
                            }
                        }

                    })
                })
                document.querySelectorAll('.delete').forEach(e => {
                    e.addEventListener('click', function (e) {
                        document.querySelector('dialog').showModal();
                        toDelete = e.target.parentElement.parentElement;
                    })
                })

            })

        }
    }
})
document.getElementById('modal-delete').addEventListener('click', () => {
    toDelete.remove();
    document.querySelector('dialog').close();
})
document.getElementById('cancel').addEventListener('click', () => {
    document.querySelector('dialog').close();
})

function validateInput() {
    inputs.forEach(element => {
        if (element.name === 'product-name') {
            if (element.value === '' && element.value.length <= 30) {
                nameKey = false;
                element.classList.remove('valid')
                element.classList.add('invalid')
            } else {
                element.classList.remove('invalid')
                element.classList.add('valid')
                nameKey = true;
            }
        }
        if (element.name === 'brand') {
            if (element.value === '') {
                brandKey = false;
                element.classList.remove('valid')
                element.classList.add('invalid')
            } else {
                element.classList.add('valid')
                element.classList.remove('invalid')
                brandKey = true;
            }
        }
        if (element.name === 'date') {
            if (element.value === '') {
                dateKey = false;
                element.classList.remove('valid');
                element.classList.add('invalid');
            } else {
                element.classList.add('valid');
                element.classList.remove('invalid');
                dateKey = true;
            }
        }
        if (element.name === 'price') {
            if (element.value === '' || Number(element.value) < 0) {
                priceKey = false;
                element.classList.remove('valid');
                element.classList.add('invalid');
            } else {
                element.classList.add('valid');
                element.classList.remove('invalid');
                priceKey = true;
            }
        }
    })
    if (select.value === '0') {
        selectKey = false;
        select.classList.add('invalid');
        select.classList.remove('valid');
    } else {
        selectKey = true;
        select.classList.remove('invalid');
        select.classList.add('valid');
    }
}
