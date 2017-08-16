import { Component, OnInit } from '@angular/core';
import { GithubService } from '../github.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {

  players={
  	player1:{
  		name: '',
  		url: '',
  		score: 0,
  		found: false
  	},
  	player2:{
  		name: '',
  		url: '',
  		score: 0,
  		found: false
  	}
  }

  constructor(private _github:GithubService, private _router:Router) { }

  ngOnInit() {
  }

  getUser(player){
  	console.log('attempting to submit from component');
  	console.log(this.players[player].name);
  	this._github.getUser(this.players[player].name)
  	.then(res=>{
  		console.log(res);
  		this.players[player].url = res.avatar_url;
  		this.players[player].found = true;
  		this.players[player].score = (res.public_repos + res.followers) * 12;
  	})
  	.catch();
  }

  showResults(){
  	console.log('attempting to show from component')
  	this._github.showResults(this.players)
  	.then(res=>{
  		this._router.navigate(['/results'])
  	})
  	.catch();
  }

}
