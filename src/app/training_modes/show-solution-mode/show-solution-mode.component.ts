import {Component, HostListener} from '@angular/core';
import {randomScrambleForEvent} from 'cubing/scramble';
import {CubeService} from "../../cube.service";
import {GanDecrypterService} from "../../gan-decrypter.service";

@Component({
  selector: 'app-show-solution-mode',
  standalone: true,
  imports: [],
  templateUrl: './show-solution-mode.component.html',
  styleUrl: './show-solution-mode.component.css'
})
export class ShowSolutionModeComponent {
  scramble = "";
  moves: string[] = [];

  constructor(private ganDecrypterService: GanDecrypterService, private cubeService: CubeService ) {
  }


  getPrettyMoves() {
    return this.moves.join(" ");
  }
  async generateScramble(){

    await randomScrambleForEvent("333bf").then((scr) => this.scramble = scr.toString());
  }

  movesTracker(bits: string){
    console.log("xx")
      let diff = Math.min((this.cubeService.serial - this.cubeService.lastSerial) & 0xFF, 7);
      this.cubeService.lastSerial = this.cubeService.serial;
      if (diff > 0) {
        for (let i = diff - 1; i >= 0; i--) {
          let face = this.ganDecrypterService.getBitWord(bits, 12 + 5 * i, 4);
          let direction = this.ganDecrypterService.getBitWord(bits, 16 + 5 * i, 1);
          let move = "URFDLB".charAt(face) + " '".charAt(direction);
          if (this.moves[this.moves.length - 1] == move) {
            this.moves[this.moves.length - 1] = this.moves[this.moves.length - 1][0] + "2";
          } else {
            this.moves.push(move);
          }
          this.cubeService.getState();
         // console.log(this.moves)
        }
      }
    // }
  }
  start(){
    this.cubeService.setT2Function(this.movesTracker.bind(this))
  }
  reset(){
    this.moves = [];
  }

  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    switch (event.key) {
      case '0':
        this.moves.push("\n");
        break;
    }
  }
}
