'use strict'
const CARROT_SIZE = 80
const field = document.querySelector('.game__field')
//getBoundingClientRect을 통해서
//해당 DOM의 x,y, 위치좌표 및 width, heigt등을 알수있다.
const fieldRect = field.getBoundingClientRect()

function initGame() {
  addItem('carrot', 5, 'img/carrot.png')
  addItem('bug', 5, 'img/bug.png')
}

function addItem(className, count, imgPath) {
  const x1 = 0
  const y1 = 0
  //x, y좌표의 기준이 좌측상단을 기준으로하므로,
  //width or heigt의 끝에 좌표가 설정될경우
  //img 크기만큼 밖으로 튀어나올수있으므로, 이미지 크기를 뺴줘야
  //영역밖으로 나가는 이미지가 없게됨
  const x2 = fieldRect.width - CARROT_SIZE
  const y2 = fieldRect.height - CARROT_SIZE
  for (let i = 0; i < count; i++) {
    const item = document.createElement('img')
    item.setAttribute('class', className)
    item.setAttribute('src', imgPath)
    //부보컨데이터의 position을 static이 아닌것으로 설정해줘야
    //우리의 absolute가 온전한 의미가 있다.
    item.style.position = 'absolute'
    const x = randomNumber(x1, x2)
    const y = randomNumber(y1, y2)
    item.style.left = `${x}px`
    item.style.top = `${y}px`
    field.appendChild(item)
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min
}
initGame()
