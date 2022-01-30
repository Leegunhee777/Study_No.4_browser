'use strict'
import PopUp from './popup.js'
import {GameBuilder, Reason} from './game.js'
import * as sound from './sound.js'
//field.addEventListener('click', (event) => onFieldClick(event));
//field.addEventListener('click', onFieldClick)
//위에 둘다 똑같음

const gameFinishBanner = new PopUp()

//builder pattern을 사용하며 Game클래스가 외부에 직접노출되는것을 방지할수있으며,
//생성자의 인자가 많을경우 각 인자가 어떤것을 의미하는지 혼란이 올수있기떄문에,
//builder pattern을 사용하는 것을 추천한다.
// const game = new Game(3, 2, 2)
const game = new GameBuilder()
  .withGameDuration(5)
  .withCarrotCount(3)
  .withBugCount(3)
  .build()
game.setGameStopListener((reason) => {
  console.log(reason)
  let message
  switch (reason) {
    case Reason.cancel:
      message = 'Replay'
      sound.playAlert()
      break
    case Reason.win:
      message = 'YOU WON'
      sound.playWin()
      break
    case Reason.lose:
      message = 'YOU LOST'
      sound.playBug()
      break
    default:
      throw new Error('not valid reason')
  }
  gameFinishBanner.showWithText(message)
})
gameFinishBanner.setClickListener(() => {
  game.start()
})

//=> 로직설명
//1. 게임이 끝나는 베너를 만든다.
//2. 게임을 만든다
//3. 게임이 끝나면, 끝난 이유에 맞게 배너를 보여준다.
//4. 그리고 베너가 클릭이 되면 게임이 다시 시작되는구나
