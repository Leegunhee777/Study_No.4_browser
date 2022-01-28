import Field from './field.js'
import * as sound from './sound.js'
export default class Game {
  constructor(gameDuration, carrotCount, bugCount) {
    this.gameDuration = gameDuration
    this.carrotCount = carrotCount
    this.bugCount = bugCount

    this.gameTimer = document.querySelector('.game__timer')
    this.gameScore = document.querySelector('.game__score')

    this.gameBtn = document.querySelector('.game__button')
    this.gameBtn.addEventListener('click', () => {
      if (this.started) {
        this.stop()
      } else {
        this.start()
      }
    })
    this.gameField = new Field(this.carrotCount, this.bugCount)
    this.gameField.setClickListener(this.onItemClick)
    //게임의 시작유무
    this.started = false
    //게임의 점수
    this.score = 0
    //타이머
    this.timer = undefined
  }

  setGameStopListener(onGameStop) {
    this.onGameStop = onGameStop
  }

  start = () => {
    this.started = true
    this.initGame()
    this.showStopButton()
    this.showTimerAndScore()
    this.startGameTimer()
    sound.playBackground()
  }
  stop = () => {
    this.started = false
    clearInterval(this.timer)
    this.hideGameButton()
    sound.playAlert()
    sound.stopBackground()
    this.onGameStop && this.onGameStop('cancel')
  }

  onItemClick = (item) => {
    if (!this.started) {
      return
    }
    if (item === 'carrot') {
      //당근
      this.score++
      this.updateScoreBoard()
      if (this.score === this.carrotCount) {
        this.finish(true)
      }
    } else if (item === 'bug') {
      //벌레!!
      this.finish(false)
    }
  }

  //true가 들어오면 이긴것, false가 들어오면 진것
  finish = (win) => {
    this.started = false
    this.hideGameButton()
    if (win) {
      sound.playWin()
    } else {
      sound.playBug()
    }
    this.stopGameTimer()
    sound.stopBackground()
    this.onGameStop && this.onGameStop(win ? 'win' : 'lose')
  }

  showStopButton = () => {
    const icon = this.gameBtn.querySelector('.fas')
    // fontawsome의 아이콘className을 활용하여 stop아이콘 이용할수있다
    icon.classList.add('fa-stop')
    icon.classList.remove('fa-play')
    this.gameBtn.style.visibility = 'visible'
  }
  hideGameButton = () => {
    this.gameBtn.style.visibility = 'hidden'
  }

  showTimerAndScore = () => {
    this.gameTimer.style.visibility = 'visible'
    this.gameScore.style.visibility = 'visible'
  }

  startGameTimer = () => {
    let remainingTimeSec = this.gameDuration
    this.updateTimerText(remainingTimeSec)

    //1초마다 계속콜백을호출되게 하는함수 setInterval
    //이것을 멈추려면 clearInterval 을 호출하면됨
    this.timer = setInterval(() => {
      if (remainingTimeSec <= 0) {
        clearInterval(this.timer)
        //CARROT_COUNT === socre은 이긴상황을 의미
        this.finish(this.carrotCount === this.score)
        return
      }
      this.updateTimerText(--remainingTimeSec)
    }, 1000)
  }
  stopGameTimer = () => {
    clearInterval(this.timer)
  }
  updateTimerText = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    this.gameTimer.innerText = `${minutes}:${seconds}`
  }

  initGame = () => {
    this.score = 0
    this.gameScore.innerHTML = this.carrotCount
    this.gameField.init()
  }

  updateScoreBoard = () => {
    this.gameScore.innerHTML = this.carrotCount - this.score
  }
}