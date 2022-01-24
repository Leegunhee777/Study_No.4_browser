'use strict'
import PopUp from './popup.js'
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

const carrotSound = new Audio('./sound/carrot_pull.mp3')
const alertSound = new Audio('./sound/alert.wav')
const bgSound = new Audio('./sound/bg.mp3')
const bugSound = new Audio('./sound/bug_pull.mp3')
const winSound = new Audio('./sound/game_win.mp3')
//field.addEventListener('click', (event) => onFieldClick(event));
//위에 방식이랑 똑같음
field.addEventListener('click', onFieldClick)

//게임의 시작유무
let started = false
//게임의 점수
let score = 0
//타이머
let timer = undefined

const gameFinishBanner = new PopUp()
gameFinishBanner.setClickListener(() => {
  startGame()
})

gameBtn.addEventListener('click', () => {
  if (started) {
    stopGame()
  } else {
    startGame()
  }
})

function startGame() {
  started = true
  initGame()
  showStopButton()
  showTimerAndScore()
  startGameTimer()
  playSound(bgSound)
}
function stopGame() {
  started = false
  clearInterval(timer)
  hideGameButton()
  gameFinishBanner.showWithText('REPLAY?')
  playSound(alertSound)
  stopSound(bgSound)
}
//true가 들어오면 이긴것, false가 들어오면 진것
function finishGame(win) {
  started = false
  hideGameButton()
  if (win) {
    playSound(winSound)
  } else {
    playSound(bugSound)
  }
  stopGameTimer()
  stopSound(bgSound)
  gameFinishBanner.showWithText(win ? 'YOU WON' : 'YOU LOST')
}
function hideGameButton() {
  gameBtn.style.visibility = 'hidden'
}
function showStopButton() {
  const icon = gameBtn.querySelector('.fas')
  // fontawsome의 아이콘className을 활용하여 stop아이콘 이용할수있다
  icon.classList.add('fa-stop')
  icon.classList.remove('fa-play')
  gameBtn.style.visibility = 'visible'
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
      //CARROT_COUNT === socre은 이긴상황을 의미
      finishGame(CARROT_COUNT === score)
      return
    }
    updateTimerText(--remainingTimeSec)
  }, 1000)
}
function stopGameTimer() {
  clearInterval(timer)
}
function updateTimerText(time) {
  const minutes = Math.floor(time / 60)
  const seconds = time % 60
  gameTimer.innerText = `${minutes}:${seconds}`
}

function initGame() {
  score = 0
  //field 초기화
  field.innerHTML = ``
  gameScore.innerHTML = CARROT_COUNT
  addItem('carrot', CARROT_COUNT, 'img/carrot.png')
  addItem('bug', BUG_COUNT, 'img/bug.png')
}

function onFieldClick(event) {
  if (!started) {
    return
  }

  const target = event.target
  //target.matches를 활용하여, 해당 타켓의 className이 carrot인지 확인가능
  if (target.matches('.carrot')) {
    //당근
    target.remove()
    score++
    playSound(carrotSound)
    updateScoreBoard()
    if (score === CARROT_COUNT) {
      finishGame(true)
    }
  } else if (target.matches('.bug')) {
    //벌레!!
    finishGame(false)
  }
  console.log(event.target)
}
function playSound(sound) {
  sound.currentTime = 0
  sound.play()
}

function stopSound(sound) {
  sound.pause()
}

function updateScoreBoard() {
  gameScore.innerHTML = CARROT_COUNT - score
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
