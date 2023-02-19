import { Game } from './Game.js';

export class Main {
  game;

  constructor() {
    this.game = new Game();
  }
}

new Main();