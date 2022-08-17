// Fetch the items from the JSON file
function loadItems() {
    return fetch('data/data.json')
    .then((response) => response.json()) // json으로 변환
    .then((json) => json.items);  // json 안의 items를 return
}

// Update the list with the given items
function displayItems(items) {
    const container = document.querySelector('.items');
    container.innerHTML = items.map((item) => createHTMLString(item)).join('');
    // html li 요소로 전환 (createHTMLString 함수 이용)
    // join > 문자열의 배열을 한 가지의 문자열로 병합
}

// Create HTML list item from the given data item
function createHTMLString(item) {
    return `
        <li class="item">
            <img src="${item.image}" alt="${item.type}" class="item__thumbnail">
            <span class="item__description">${item.gender}, ${item.size}</span>
        </li>
        `;
}

// button 클릭되었을 떄 발생하는 이벤트
function onButtonClick (event, items) {
    const dataset = event.target.dataset;
    const key = dataset.key;
    const value = dataset.value;

    if (key == null || value == null) {
        return;
    }

    const filtered = items.filter((item) => item[key] === value);
    displayItems(filtered);
}

function setEventListeners(items) {
    const logo = document.querySelector('.logo');
    const buttons = document.querySelector('.buttons');
    logo.addEventListener('click', () => displayItems(items));
    buttons.addEventListener('click', (event) => onButtonClick(event, items));
}

// main
loadItems()   // data를 읽어와서 아이템을 전달하는 역할
.then(items => {
    displayItems(items);
    setEventListeners(items)
})
.catch(console.log);