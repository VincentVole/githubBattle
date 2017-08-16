import { Component, OnInit } from '@angular/core';
import { GithubService } from '../github.service';

@Component({
  selector: 'app-rankings',
  templateUrl: './rankings.component.html',
  styleUrls: ['./rankings.component.css']
})
export class RankingsComponent implements OnInit {

  fighters;

  constructor(private _github:GithubService) {
  	this.getRankings()
  }

  ngOnInit() {
  }

  getRankings(){
  	this._github.getRankings()
  	.then(res=>{
  		this.fighters = res;
  		this.fighters.sort(function(a,b){
  			if(a.score > b.score)
  				return -1;
  			if(a.score < b.score)
  				return 1;
  			return 0;
  		})
  	})
  	.catch()
  }

}
