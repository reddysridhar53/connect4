import { Injectable } from '@angular/core';
import {Case} from './case';
import {GridManagerService} from "./grid-manager.service";

@Injectable()
export class GameService {

  private _grid: Case[][] = [];
  private _currentPlayer: number = 1;
  private _gridManager: GridManagerService;

  constructor(gridManager: GridManagerService) {
    for (let i = 0; i < 6; i++) {
      let columns = [];
      for (let i = 0; i < 7; i++) {
        columns.push(new Case(0));
      }
      this._grid.push(columns);
      this._gridManager = gridManager;
    }
  }

  get currentPlayer(): number {
    return this._currentPlayer;
  }

  set currentPlayer(player: number) {
    this._currentPlayer = player;
  }

  isPlayerOne(): boolean {
    return this._currentPlayer === 1;
  }

  isPlayerTwo(): boolean {
    return this._currentPlayer === 2;
  }



  addPiece(column: number): number {
    if (column >= 0 && column < this._grid[0].length && this._grid[0][column].isEmpty()) {
      let i = 5;
      while (!this._grid[i][column].isEmpty()) {
        i--;
      }
      this._grid[i][column].state = this._currentPlayer;
      return this._gridManager.hasFour(this._currentPlayer, this._grid) ? this._currentPlayer : 0;
    } else {
      return -1;
    }
  }

  nextPlayer() {
    this._currentPlayer = (this._currentPlayer === 1) ? 2 : 1;
  }

  get grid(): Case[][] {
    return this._grid;
  }

  clear() {
    this._grid = [];
    for (let i = 0; i < 6; i++) {
      let columns = [];
      for (let i = 0; i < 7; i++) {
        columns.push(new Case(0));
      }
      this._grid.push(columns);
    }
    this._currentPlayer = 1;
  }

}
