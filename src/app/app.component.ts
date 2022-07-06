import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Player } from './model/player';
import { ServiceComponent } from './service/service.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  service: ServiceComponent;
  playerForm: FormGroup;
  page: number;
  paramPlayer : Player;
  results : Player[];
  message : string;

  constructor(
    fb: FormBuilder,
    ) { 
      this.playerForm = fb.group({
        name :[''],
        matches : [''],
        wins : ['']
      });
    }


  ngOnInit(): void {
    this.paramPlayer = new Player();
    this.page = 0;
    this.getPlayers(0);
  }

  getPlayers(page:number){
    this.service.getPlayers(page).subscribe(
      (data) => {
        this.results = data;
      }
    );
  }

  buildParamPlayer(){
    this.paramPlayer.name = this.playerForm.get("name")?.value;
    this.paramPlayer.matches = this.playerForm.get("matches")?.value;
    this.paramPlayer.wins = this.playerForm.get("wins")?.value;
  }

  sendData(player : Player){
    this.service.addScores(player).subscribe(
      (data) => {
        this.message = data;
      }
    );
  }

  select(player: Player){
    this.paramPlayer.name = player.name;
    this.paramPlayer.matches = player.matches;
    this.paramPlayer.wins = player.wins;
  }

  submitNew(){
    this.buildParamPlayer();
    this.sendData(this.paramPlayer);
  }

  submitEdit(){
    this.paramPlayer.matches += this.playerForm.get("matches")?.value;
    this.paramPlayer.wins += this.playerForm.get("wins")?.value;
    this.sendData(this.paramPlayer);
  }
  
}
