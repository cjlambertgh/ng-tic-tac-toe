import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  sections: Section[] = [];
  selectedSections: number[] = [];
  players: Player[] = [
    {id: 0, name: 'Player 1', color: '#ff0000'}, 
    {id: 1, name: 'Player 2', color: '#0033cc'}
  ];
  playerTurn = 1;
  currentPlayer: Player = {id: -1, name: '', color: ''};
  gameWon = false;

  constructor() {
    this.initialiseGame();
   }

  ngOnInit(): void {
  }

  onSectionClicked(section: number): void {
    if(this.gameWon === false && !this.selectedSections.includes(section)) {
      this.selectedSections.push(section);      
      this.sections[section].playerSelected = this.currentPlayer;
      const winner = this.checkVictory(this.currentPlayer.id);
      if(winner === true) {
        this.gameWon = true;
        alert(`${this.currentPlayer.name} wins!`);
      }
      else {
        this.currentPlayer = this.currentPlayer.id === 0 ? this.players[1] : this.players[0];
      }
    }
  }

  checkVictory(id: number): boolean {
    let playerSections = this.getPlayerSelectedSections(id);
    console.log(playerSections);
    let topRow = [0,1,2];
    let success = topRow.every((val) => playerSections.includes(val))
    return success;
  }

  getPlayerSelectedSections(playerId: number): number[] {
    return this.sections.filter(s => s.playerSelected?.id === playerId).map(s => s.id);
  }

  newGame(): void {
    this.initialiseGame();
  }

  initialiseGame(): void {
    this.gameWon = false;
    this.selectedSections = [];
    this.sections = [];
    for (let index = 0; index < 9; index++) {
      this.sections.push({id: index, playerSelected: undefined});      
    }
    this.currentPlayer = this.players[0];
  }

}

export interface Player {
  id: number;
  name: string;
  color: string;
}

export interface Section {
  id: number;
  playerSelected?: Player;
}
