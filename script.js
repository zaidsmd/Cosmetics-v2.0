let inputs = document.querySelectorAll("input:not([type=radio],select)");
let nameKey, brandKey, dateKey, selectKey, priceKey;
let select = document.querySelector('select');
let add = document.getElementById('add');
let table = document.getElementById('table');
let dataToModify = []
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
            modifyBtn.id = 'modify';
            let deleteBtn = document.createElement('button');
            deleteBtn.innerHTML = 'Delete';
            deleteBtn.classList.add('secondary-btn');
            deleteBtn.id = 'delete';
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
            inputs.forEach(e=>{
                e.value = '';
                e.setAttribute('value','')
                e.classList.remove('valid')
            })
            document.querySelector('select').classList.remove('valid')
            document.querySelectorAll('#modify').forEach(e=>{
                e.addEventListener('click',event=>{
                    Object.values(e.parentElement.parentElement.children).forEach((element,index)=>{
                        if (index===2){
                           dataToModify.push(Number(element.innerHTML.replace(/^\D+/g,'').trim()))
                        }else if(index<5){
                            dataToModify.push(element.innerHTML);
                        }
                    })
                    dataToModify.forEach((el,i)=>{
                        if(i<4){
                            inputs[i].value = el;
                        }
                    })
                    document.querySelector(`[value=${dataToModify[4]}]`).setAttribute('checked','');
                    if (dataToModify[5]==='yes'){
                        document.getElementById('on-sale').setAttribute('checked','');
                    }else {
                        document.getElementById('not-on-sale').setAttribute('checked','');
                    }

                })
            })

        }
    }
})
