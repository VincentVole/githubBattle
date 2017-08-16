import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class GithubService {

  constructor(private _http:Http) { }

  getUser(username){
  	console.log('in service')
  	return this._http.get('https://api.github.com/users/'+username)
  	.map(res=>res.json())
  	.toPromise();
  }

  showResults(players){
  	console.log('attempting to show from service')
  	return this._http.post('/api/add', players)
  	.map(res=>res.json())
  	.toPromise();
  }

  getPlayers(){
  	return this._http.get('/api/fighters')
  	.map(res=>res.json())
  	.toPromise();
  }

  getRankings(){
  	return this._http.get('/api/all')
  	.map(res=>res.json())
  	.toPromise()
  }
}
