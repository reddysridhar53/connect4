import { Component, OnInit } from '@angular/core';
import { GameService } from '../brain/game.service';
import { Player } from '../brain/Player';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  public pieces = [{visible: false}, {visible: false}, {visible: false}, {visible: false}, {visible: false}, {visible: false}, {visible: false}];
  public winner: number = 0;
  private _game: GameService;
  public showWinner: number;
  public playerOne: Player = new Player('Player 1', 1);
  public playerTwo: Player = new Player('Player 2', 2);
  private _timeout: any;
  public noOfGames: number;
  public totalGames: number;

  constructor(game: GameService) {
    this._game = game;
  }

  add(column: number) {
    const winner = this._game.addPiece(column);
    const audio = new Audio('src/app/assets/audio/coin-drop-4.mp3');
    audio.play();
    if (winner === 0) {
      this._game.nextPlayer();
    } else if (winner !== -1) {
      this.setPlayerScore(winner);
    }
  }

  setPlayerScore(winner: number): void {
    switch (winner) {
      case 1:
        this.playerOne.score += 1;
        break;
      case 2:
        this.playerTwo.score += 1;
        break;
    }
    if (this.playerOne.score === this.totalGames - 1 || this.playerTwo.score === this.totalGames - 1) {
      this.showWinnerDetails();
    } else {
      this.noOfGames += 1;
      this._game.clear();
    }
  }

  show(i: number) {
    this.pieces.map((piece, index) => piece.visible = i === index);
  }

  get game(): GameService {
    return this._game;
  }

  showWinnerDetails() {
    if (this.playerOne.score === this.totalGames - 1) {
      this.showWinner = 1;
    } else {
      this.showWinner = 2;
    }
    this._timeout = setTimeout(function(){
      this.playAgain();
    }, 1000);
  }

  playAgain(): void {
    this._game.clear();
    this.pieces = [
      {visible: false},
      {visible: false},
      {visible: false},
      {visible: false},
      {visible: false},
      {visible: false},
      {visible: false}
    ];
    this.showWinner = 0;
    this.playerOne.score = 0;
    this.playerTwo.score = 0;
    this.noOfGames = 1;
  }

  restart() {
    this._game.clear();
  }

  ngOnDestroy() {
    if (this._timeout) {
      clearTimeout(this._timeout);
    }
  }

  ngOnInit() {
    this.showWinner = 0;
    this.noOfGames = 1;
    this.totalGames = 3;
  }
}

