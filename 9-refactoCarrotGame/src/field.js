'use strict'
import * as sound from './sound.js'
const CARROT_SIZE = 80
export const ItemType = Object.freeze({
  carrot: 'carrot',
  bug: 'bug',
})
export class Field {
  constructor(carrotCount, bugCount) {
    this.carrotCount = carrotCount
    this.bugCount = bugCount
    this.field = document.querySelector('.game__field')
    //getBoundingClientRect을 통해서
    //해당 DOM의 x,y, 위치좌표 및 width, heigt등을 알수있다.
    this.fieldRect = this.field.getBoundingClientRect()
    this.field.addEventListener('click', this.onClick)
  }

  init() {
    this.field.innerHTML = ``
    this._addItem('carrot', this.carrotCount, 'img/carrot.png')
    this._addItem('bug', this.bugCount, 'img/bug.png')
  }

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick
    console.log(this.onItemClick)
  }

  //addItem함수의 경우 Field안에서만 쓰이기 때문에, typescript의 경우 private으로 선언하는 것이 옳다.
  //javascript에서는 private이 없기때문에 표식으로 _를 사용함, 안좋은 관례
  _addItem(className, count, imgPath) {
    const x1 = 0
    const y1 = 0
    //x, y좌표의 기준이 좌측상단을 기준으로하므로,
    //width or heigt의 끝에 좌표가 설정될경우
    //img 크기만큼 밖으로 튀어나올수있으므로, 이미지 크기를 뺴줘야
    //영역밖으로 나가는 이미지가 없게됨
    const x2 = this.fieldRect.width - CARROT_SIZE
    const y2 = this.fieldRect.height - CARROT_SIZE
    for (let i = 0; i < count; i++) {
      const item = document.createElement('img')
      item.setAttribute('class', className)
      item.setAttribute('src', imgPath)
      //부보컨데이터의 position을 static이 아닌것으로 설정해줘야
      //우리의 absolute가 온전한 의미가 있다.
      item.style.position = 'absolute'
      //randomNumber의 경우 밖에 선언한 함수이므로, this. 으로 접근하지 않아도됨
      const x = randomNumber(x1, x2)
      const y = randomNumber(y1, y2)
      item.style.left = `${x}px`
      item.style.top = `${y}px`
      this.field.appendChild(item)
    }
  }
  onClick = (event) => {
    const target = event.target
    //target.matches를 활용하여, 해당 타켓의 className이 carrot인지 확인가능
    console.log(this.onItemClick)
    if (target.matches('.carrot')) {
      //당근일때
      target.remove()
      sound.playCarrot()
      this.onItemClick && this.onItemClick(ItemType.carrot)
    } else if (target.matches('.bug')) {
      //벌레일때
      this.onItemClick && this.onItemClick(ItemType.bug)
    }
  }
}

//randomNumber, playSound 함수의 경우, Field 클래스와는 관련이 없는 함수이므로,
//괜히 클래스 내부에 선언하여, 인스턴스를 생성할때마다 만들어 메모리 낭비할필요없다.
//그래서 클래스와 직접적인 연관없다면 외부에 선언하여 사용해라
//이런것들을 보통 스태틱함수다~라고 함!!!!!!!
// 인스턴스마다 생성할 필요가 없는함수!!!!

function randomNumber(min, max) {
  return Math.random() * (max - min) + min
}
// function playSound(sound) {
//   sound.currentTime = 0
//   sound.play()
// }
