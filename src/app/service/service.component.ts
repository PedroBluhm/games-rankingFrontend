import { Component, Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Player } from '../model/player';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
@Injectable()
export class ServiceComponent implements OnInit {

  constructor(
    private http: HttpClient
    ) { 

    }

  ngOnInit(): void {
  }
  
  getPlayers(page : number) : Observable<Player[]>{
    return this.http.get<Player[]>("/players/getpagged/" + page);
  }

  addScores(player : Player) : Observable<string>{
    return this.http.post<string>("/players/add/", player);
  }

}
