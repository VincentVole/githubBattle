import { Component, OnInit } from '@angular/core';
import { GithubService } from '../github.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  player1:object;
  player2:object;

  constructor(private  _github:GithubService) {
  	this.getPlayers();
  }

  ngOnInit() {
  }

  getPlayers(){
  	this._github.getPlayers()
  	.then(res=>{
  		console.log('got both players back to component')
  		console.log(res);
  		this.player1 = res.player1;
  		this.player2 = res.player2;
  	})
  	.catch(err=>{
  		console.log('error getting both players back to component')
  	});
  }
}
