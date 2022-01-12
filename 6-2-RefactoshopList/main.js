//6-ShopList처럼 li 마다 event 리스터를 등록하는건 완전 구리다.
//event delegation을 이용하여 refactoring해보자
const items = document.querySelector('.items')
const input = document.querySelector('.footer__input')
const addBtn = document.querySelector('.footer__button')

let id = 0 //UUID를 통해서 고유한 아이디를 만드는것이좋지만, 일단은 integer로 하자
function createItem(text) {
  const itemRow = document.createElement('li')
  itemRow.setAttribute('class', 'item__row')
  itemRow.setAttribute('data-id', id)
  itemRow.innerHTML = `
        <div class="item" >
           <span class="item__name">${text}</span>
            <button class="item__delete">
             <i class="far fa-trash-alt" data-id=${id}></i>
           </button>
             </div>
         <div class="item__divider"></div>`
  id++
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
  //4. 새로 추가된 아이템으로 스크롤링(input에 입력하면 그에 맞에 스크롤이 밑으로 내려가야하므로)
  item.scrollIntoView({block: 'center'})
  //5. 인풋을 초기화 한다.
  input.value = ''
  input.focus()
}

addBtn.addEventListener('click', () => {
  onAdd()
})

//어떤 키가 눌렸는지 보려면 event를 추적해보면됨
input.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    onAdd()
  }
})

items.addEventListener('click', (event) => {
  //쓰레기통아이콘을 누를때라는 조건을 건다
  //삭제를 구현하기 위한것이므로
  //혹시 다른 I 아이콘이 있을경우 , 쓰레기통을 클릭했다는 근거가 더필요하기떄문에
  //dataset속성을 사용함
  const id = event.target.dataset.id
  if (id && event.target.nodeName === 'I') {
    //ul의요소에서 remove를 쓰기위해
    //쓰레기 아이콘을 담고있는 li를 가져와야함
    //그래서 li와 쓰레기 아이콘에 data-set을 매칭하여 가져오고자한것임
    //추가적으로 item className에서 data-id 속성에 접근할때 아래처럼 접근가능함
    const toBeDeleted = document.querySelector(`.item__row[data-id='${id}']`)
    toBeDeleted.remove()
  }
})
