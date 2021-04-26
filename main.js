const inputItemRegEx = /^[\d\w]+$/;

const inputItem = document.getElementById('inputItem');
const list = document.getElementById('list');
const addBtn = document.getElementById('addBtn');
const sortByNameBtn = document.getElementById('sortByNameBtn');
const sortByValueBtn = document.getElementById('sortByValueBtn');
const deleteBtn = document.getElementById('deleteBtn');
const showXmlBtn = document.getElementById('showXmlBtn');
const closeBTN = document.getElementById("close");
const modal = document.getElementById("myModal");
const modalMessage = document.getElementById("modalMessage");


const pairList = [];

addBtn.addEventListener('click', addItem);
sortByNameBtn.addEventListener('click', (e) => manipulateList(e));
sortByValueBtn.addEventListener('click', (e) => manipulateList(e));
deleteBtn.addEventListener('click', (e) => manipulateList(e));
showXmlBtn.addEventListener('click', (e) => manipulateList(e));
closeBTN.addEventListener('click', closeModal);

const sortByName = () => pairList.sort((a, b) => a.toLowerCase() > b.toLowerCase() ? 1 : -1);
const sortByValue = () => {
    pairList.sort((x, y) => {
        return x.slice(x.indexOf('=') + 1).toLowerCase() >
        y.slice(y.indexOf('=') + 1).toLowerCase() ? 1 : -1
    });

};

function closeModal() {
    modal.style.display = "none";
    modalMessage.innerHTML = ''
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
        modalMessage.innerHTML = ''
    }
};

function manipulateList(e) {
    const btn = e.target.id;
    list.innerHTML = '';
    switch (btn) {
        case 'sortByNameBtn':
            sortByName();
            break;
        case 'sortByValueBtn':
            sortByValue();
            break;
        case 'showXmlBtn':
            showXml();
            break;
        case 'deleteBtn':
            return pairList.length = 0;
    }
    pairList.map(pair => appendItem(pair));
}

function appendItem(pair) {
    const li = document.createElement('li');
    li.append(pair);
    list.appendChild(li);
}

function showXml() {

    if(pairList.length === 0) {
        modalMessage.append('No pairs');
        return modal.style.display = "block";
    }
    const ul = document.createElement('ul');
    const li = document.createElement('li');

    li.append(`<list>`);

    const ulPair = document.createElement('ul');

    li.appendChild(ulPair);

    pairList.map(item => {
        const liPair = document.createElement('li');
        liPair.append(`<pair>${item}</pair>`);
        return ulPair.appendChild(liPair)
    });
    li.append(`</list>`);

    modalMessage.appendChild(li);

    modal.style.display = "block";
}

function addItem() {

    const validatedItem = validate(inputItem.value);

    if (validatedItem) {
        pairList.push(validatedItem);
        appendItem(validatedItem);
        inputItem.value = '';
    } else {
        modalMessage.append('Please, input valid Name/Value pair.');
        modal.style.display = "block";

    }
}

function validate(inputItem) {

    const pairArr = inputItem.trim().split('=').map(item => item.trim());

    return (pairArr.length === 2
        && inputItemRegEx.test(pairArr[0])
        && inputItemRegEx.test(pairArr[1])) ?
        pairArr.join('=') :
        false;
}