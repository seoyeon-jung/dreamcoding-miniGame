// Fetch the items from the JSON file
function loadItems() {
    return fetch('data/data.json')
    .them(response => response.json())
    .them(json => json.items);
}

// Update the list with the given items
function displayItems(items) {
    const container = document.querySelector('.items');
    container.innerHTML = items.map(item => createHTMLString(item).join(''));
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

    dispalyItems(items.filter(item => item[key] === value));
}

function setEventListeners(items) {
    const logo = docuemnt.querySelector('.logo');
    const buttons = docuemnt.querySelector('.buttons');
    logo.addEventListener('click', () => displayItems(items));
    buttons.addEventListener('click', () => onButtonClick(event, item));
}

// main
loadItems()   // data를 읽어와서 아이템을 전달하는 역할
.them(items => {
    dispalyItems(items);
    setEventListeners(items)
})
.catch(console.log);