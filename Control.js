export class Control {
  controlKeys = {
    w: 'playerOneUp',
    s: 'playerOneDown',
    arrowup: 'playerTwoUp',
    arrowdown: 'playerTwoDown',
    enter: 'enter'
  }

  actions = {
    playerOneUp: false,
    playerOneDown: false,
    playerTwoUp: false,
    playerTwoDown: false,
    enter: false
  }

  constructor() {
    document.addEventListener('keydown', (event) => {
      this.actions[this.controlKeys[String(event.key).toLowerCase()]] = true
    })
    document.addEventListener('keyup', (event) => {
      this.actions[this.controlKeys[String(event.key).toLowerCase()]] = false
    })
  }

  getActions() {
    return this.actions;
  }

}