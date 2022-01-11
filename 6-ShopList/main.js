const items = document.querySelector('.items')
const input = document.querySelector('.footer__input')
const addBtn = document.querySelector('.footer__button')

function createItem(text) {
  const itemRow = document.createElement('li')
  itemRow.setAttribute('class', 'item__row')

  const item = document.createElement('div')
  item.setAttribute('class', 'item')

  const name = document.createElement('span')
  name.setAttribute('class', 'item__name')
  name.innerText = text

  const deleteBtn = document.createElement('button')
  deleteBtn.setAttribute('class', 'item__delete')
  deleteBtn.innerHTML = `<i class='far fa-trash-alt'></i>`
  deleteBtn.addEventListener('click', () => {
    items.removeChild(itemRow)
  })
  const itemDivider = document.createElement('div')
  itemDivider.setAttribute('class', 'item__divider')

  item.appendChild(name)
  item.appendChild(deleteBtn)
  itemRow.appendChild(item)
  itemRow.appendChild(itemDivider)
  return itemRow
}

function onAdd() {
  //1. 사용자가 입력한 텍스트를 받아옴
  const text = input.value
  if (text === '') {
    input.focus()
    return
  }
  //2. 새로운 아이템을 만듬 (텍스트 + 삭제 버튼)
  const item = createItem(text)
  //3. items 컨테이너 안에 새로만든 아이템을 추가한다.
  items.appendChild(item)
  //4. 인풋을 초기화 한다.
  input.value = ''
  input.focus()
}

addBtn.addEventListener('click', () => {
  onAdd()
})

//어떤 키가 눌렸는지 보려면 event를 추적해보면됨
input.addEventListener('keypress', (event) => {
  console.log('key')
})
