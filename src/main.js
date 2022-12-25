// Fetch the items from the JSOM file
function loadItems() {
  return fetch('data/data.json')
    .then((response) => response.json())
    .then((json) => json.items);
  // (data.json을 받아와서 응답이 되면 json() 내장함수 이용해서 json으로 변환)
  // (변환되면 json의 전부가 아닌 items만 전달받아옴)
}

// Update the list with the given items
function displayItems(items) {
  const container = document.querySelector('.items');
  container.innerHTML = items.map((item) => createHTMLString(item)).join('');
  // (HTML items 안에 있는 요소들을 li 요소의 문자열로 만들어 새롭게 mapping 하는 것)
  // (join() API: 문자열의 배열들을 한가지 문자열로 병합하는 내장함수)
}

// (li 태그로 바꾸어주는 함수)
// Create HTML List item from the given data item
function createHTMLString(item) {
  return `
  <li class="item">
     <img src="${item.image}" alt="${item.type}" class="item__thumbnail" />
     <span class="item__description">${item.gender}, ${item.size} size</span>
</li>
  `;
}

// Handle button click
function onButtonClick(event, items) {
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;

  if (key == null || value == null) {
    return;
  }

  displayItems(items.filter((item) => item[key] === value));
}

function setEventListeners(items) {
  const logo = document.querySelector('.logo');
  const buttons = document.querySelector('.buttons');
  logo.addEventListener('click', () => displayItems(items));
  buttons.addEventListener('click', (event) => onButtonClick(event, items));
  // event와 items를 인자로 받는 함수
}

// main
loadItems()
  .then((items) => {
    displayItems(items);
    setEventListeners(items);
  })
  .catch(console.log);

// loadItems()를 이용해서 items를 동적으로 받아온 다음에,
// 받아온 items를 displayItem()라는 함수를 호출해서,
// container 변수에 innerHTML를 업데이트
// 업데이트는, 우리가 받아온 오브젝트 items를
// li 문자열로 변환한 다음, 그것을 하나의 문자열(join())로 만들어서
// innerHTML에 추가했음
