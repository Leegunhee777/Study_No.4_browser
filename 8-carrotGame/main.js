'use strict'
const CARROT_SIZE = 80
const CARROT_COUNT = 5
const BUG_COUNT = 5
const GAME_DURATION_SEC = 5
const field = document.querySelector('.game__field')
//getBoundingClientRect을 통해서
//해당 DOM의 x,y, 위치좌표 및 width, heigt등을 알수있다.
const fieldRect = field.getBoundingClientRect()
const gameBtn = document.querySelector('.game__button')
const gameTimer = document.querySelector('.game__timer')
const gameScore = document.querySelector('.game__score')

//게임의 시작유무
let started = false
//게임의 점수
let score = 0
//타이머
let timer = undefined

gameBtn.addEventListener('click', () => {
  if (started) {
    stopGame()
  } else {
    startGame()
  }
  started = !started
})
function startGame() {
  initGame()
  showStopButton()
  showTimerAndScore()
  startGameTimer()
}
function stopGame() {}

function showStopButton() {
  const icon = gameBtn.querySelector('.fa-play')
  // fontawsome의 아이콘className을 활용하여 stop아이콘 이용할수있다
  icon.classList.add('fa-stop')
  icon.classList.remove('fa-play')
}

function showTimerAndScore() {
  gameTimer.style.visibility = 'visible'
  gameScore.style.visibility = 'visible'
}

function startGameTimer() {
  let remainingTimeSec = GAME_DURATION_SEC
  updateTimerText(remainingTimeSec)

  //1초마다 계속콜백을호출되게 하는함수 setInterval
  //이것을 멈추려면 clearInterval 을 호출하면됨
  timer = setInterval(() => {
    if (remainingTimeSec <= 0) {
      clearInterval(timer)
      return
    }
    updateTimerText(--remainingTimeSec)
  }, 1000)
}

function updateTimerText(time) {
  const minutes = Math.floor(time / 60)
  const seconds = time % 60
  gameTimer.innerText = `${minutes}:${seconds}`
}
function initGame() {
  //field 초기화
  field.innerHTML = ``
  gameScore.innerHTML = CARROT_COUNT
  addItem('carrot', CARROT_COUNT, 'img/carrot.png')
  addItem('bug', BUG_COUNT, 'img/bug.png')
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
