'use strict'
import PopUp from './popup.js'
import Field from './field.js'
const CARROT_COUNT = 5
const BUG_COUNT = 5
const GAME_DURATION_SEC = 5

const gameBtn = document.querySelector('.game__button')
const gameTimer = document.querySelector('.game__timer')
const gameScore = document.querySelector('.game__score')

const alertSound = new Audio('./sound/alert.wav')
const bgSound = new Audio('./sound/bg.mp3')
const bugSound = new Audio('./sound/bug_pull.mp3')
const winSound = new Audio('./sound/game_win.mp3')
//field.addEventListener('click', (event) => onFieldClick(event));
//위에 방식이랑 똑같음

const gameField = new Field(CARROT_COUNT, BUG_COUNT)
gameField.setClickListener(onItemClick)

function onItemClick(item) {
  if (!started) {
    return
  }
  if (item === 'carrot') {
    //당근
    score++
    updateScoreBoard()
    if (score === CARROT_COUNT) {
      finishGame(true)
    }
  } else if (item === 'bug') {
    //벌레!!
    finishGame(false)
  }
}
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
  gameScore.innerHTML = CARROT_COUNT
  gameField.init()
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
